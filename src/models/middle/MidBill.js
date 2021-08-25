import {
  Role,
  Users,
  Bill,
  UserBill,
  Voucher,
  BillProduct,
  Product,
} from "../core";
import { Op } from "sequelize";
import { checkPassword, hashPassword } from "../../libs/encrypt";
import { generateToken } from "../../libs/token";
import { ERROR_MESSAGE } from "../../config/error";
import {
  sendMailActiveOrder,
  sendMailForgotPassword,
} from "../../libs/sendmail";
import { v4 as uuidv4 } from "uuid";
import database, { password } from "../../config/database";
import { name } from "ejs";

class MidBill {

  async listCart(data) {
    let cart = {
      shopID: "",
      userID: data.userID,
      billID: "",
      status: 0,
      address: "",
      voucherCode: "",
      listCart: [],
    };
    let billList = await UserBill.findAll({
      //tim bill trong db cua user
      where: {
        user_id: data.userID,
        del: 0,
      },
    });


    let billTemp;
    for (let i = 0; i < billList.length; i++) {
      //tim trong billist ra bill tam
      billTemp = await Bill.findOne({
        where: {
          id: billList[i].bill_id,
          status: 0,
          del: 0,
        },
      });
    }
    if (billTemp) {
      //neu co bill tam thi tim ra thong tin cua bill tam
      let shopIDTemp = await UserBill.findOne({
        where: {
          bill_id: billTemp.dataValues.id,
          del: 0,
        },
      });

      cart.shopID = shopIDTemp.dataValues.shop_id;
      let listTemp = await BillProduct.findAll({
        //tim ra tat ca id cua san pham trong bill tam
        where: {
          bill_id: billTemp.dataValues.id,
          del: 0,
        },
      });
      for (let j = 0; j < listTemp.length; j++) {
        //tim ra thong tin cua tat ca san pham tu id san pham
        let objProduct = await Product.findOne({
          where: {
            id: listTemp[j].product_id,
            del: 0,
          },
        });
        cart.listCart.push({
          count: listTemp[j].quantity,
          id: listTemp[j].product_id,
          name: objProduct.name,
          price: objProduct.unit_price,
        });
      }
      if (billTemp.dataValues.voucher_id) {
        let voucher = await Voucher.findOne({
          where: {
            id: billTemp.dataValues.voucher_id,
            del: 0,
          },
        });
        cart.voucherCode = voucher.code;
      }
      cart.billID = billTemp.dataValues.id;
      cart.address = billTemp.dataValues.address;
      cart.status = billTemp.dataValues.status;
      return cart;
    } else {
      return {};
    }
  }
  async createBill(data) {
    let totalPrice = 0;
    let voucherID = null;

    if (data.cart.billID) {
      //neu co bill id thi bill truyen ve la bill tam
      let billTemp = await Bill.findOne({
        where: {
          id: data.cart.billID,
          status: 0,
          del: 0,
        },
      });
      // check neu bill tam day co ton tai 
      if (billTemp) {
        // check xem listCart tra ve rong hay khong
        if (data.cart.listCart && data.cart.listCart.length != 0) {
          // neu listCart tra ve khac rong thi cap nhat lai cac truong trong DB 
          for (let i = 0; i < data.cart.listCart.length; i++) {
            totalPrice +=
              data.cart.listCart[i].price * data.cart.listCart[i].count;
          }

          if (data.cart.voucherCode) {
            let voucher = await Voucher.findOne({
              where: {
                code: data.cart.voucherCode,
                del: 0,
              },
            });
            if (voucher) {
              totalPrice -= voucher.dataValues.discount_number;
              voucherID = voucher.dataValues.id;
            }
          }

          let statusTemp = data.cart.status;
          let addressTemp = data.cart.address;

          let billUpdate = {
            total_price: totalPrice,
            status: statusTemp,
            address: addressTemp,
            voucher_id: voucherID,
            del: 0,
          };

          await billTemp.update(billUpdate);
          // cap nhat lai bang BillProduct
          let billProductList = await BillProduct.findAll({
            where: {
              bill_id: billTemp.dataValues.id,
              del: 0,
            },
          });

          // Xoa het cac mat hang cu trong gio hang di
          let dataDelete = {
            del: 1,
          };
          for (let k = 0; k < billProductList.length; k++) {
            await billProductList[k].update(dataDelete);
          }
          //

          // Sau khi xoa het cac mat hang cu, tao lai cac mat hang moi trong db
          for (let l = 0; l < data.cart.listCart.length; l++) {
            totalPrice +=
              data.cart.listCart[l].price * data.cart.listCart[l].count;
            let billProduct = {
              quantity: data.cart.listCart[l].count,
              unit_price: data.cart.listCart[l].price,
              total_price:
                data.cart.listCart[l].count * data.cart.listCart[l].price,
              product_id: data.cart.listCart[l].id,
              bill_id: data.cart.billID,
              del: 0,
            };
            await BillProduct.create(billProduct);
          }
          //


          
          let userBillList = await UserBill.findOne({
            where: {
              bill_id: billTemp.id,
              del: 0,
            },
          });
          let userBill = {
            bill_id: billTemp.id,
            shop_id: data.cart.shopID,
            del: 0,
          };
          await userBillList.update(userBill);
          return data.cart.billID; //them moi
        }
        else {
        
          let billUpdate = {
            total_price: 0,
            status: 0,
            del: 0,
          };

          await billTemp.update(billUpdate);
          let billProductList = await BillProduct.findAll({
            where: {
              bill_id: billTemp.dataValues.id,
              del: 0,
            },
          });

          let dataDelete = {
            del: 1,
          };
          for (let k = 0; k < billProductList.length; k++) {
            await billProductList[k].update(dataDelete);
          }
        }
      }
    } else {
      console.log("vaoooo2");

      for (let i = 0; i < data.cart.listCart.length; i++) {
        totalPrice += data.cart.listCart[i].price * data.cart.listCart[i].count;
      }

      if (data.cart.voucherCode) {
        let voucher = await Voucher.findOne({
          where: {
            code: data.cart.voucherCode,
            del: 0,
          },
        });
        if (voucher) {
          totalPrice -= voucher.dataValues.discount_number;
          voucherID = voucher.dataValues.id;
        }
      }

      let status = data.cart.status;

      let address = data.cart.address;
      let billCreate = {
        total_price: totalPrice,
        status: status,
        address: address,
        voucher_id: voucherID,
        del: 0,
      };
      let bill = await Bill.create(billCreate);
      for (let i = 0; i < data.cart.listCart.length; i++) {
        totalPrice += data.cart.listCart[i].price * data.cart.listCart[i].count;
        let billProduct = {
          quantity: data.cart.listCart[i].count,
          unit_price: data.cart.listCart[i].price,
          total_price:
            data.cart.listCart[i].count * data.cart.listCart[i].price,
          product_id: data.cart.listCart[i].id,
          bill_id: bill.dataValues.id,
          del: 0,
        };
        await BillProduct.create(billProduct);
      }
      let userBill = {
        bill_id: bill.dataValues.id,
        user_id: data.cart.userID,
        shop_id: data.cart.shopID,
        del: 0,
      };
      await UserBill.create(userBill);
      return bill.dataValues.id;
    }
  }

  async deleteBill(data) {
    let objDelete = await Bill.findOne({
      where: {
        id: data.id,
        del: 0,
      },
    });
    let dataDelete = {
      del: 1,
    };

    objDelete.update(dataDelete);
  }
  async updateBill(data) {
    if (!data.id) {
      throw new Error(ERROR_MESSAGE.BILL.BILL_NOT_EXIST);
    }
    let objUpdate = await Bill.findOne({
      where: {
        id: data.id,
        del: 0,
      },
    });

    let dataUpdate = {
      total_price: 1,
      del: 0,
    };

    return await objUpdate.update(dataUpdate);
  }
  async listOrderForSeller(data) {
    let listBillTotal = [];
    let condition = {
      shop_id: data.shop_id,
      del: 0,
    };
    const [listBill, total] = await Promise.all([
      UserBill.findAll({
        where: condition,
        order: [["createdAt", "DESC"]],
      }),
      UserBill.count({
        where: condition,
      }),
    ]);

    for (let i = 0; i < listBill.length; i++) {
      let userBill = {
        user: {},
        billList: [],
        shop: {},
        bill: {},
        createAt: listBill[i].dataValues.createdAt,
      };
      let billInprocess = await Bill.findOne({
        where: {
          id: listBill[i].bill_id,
          status: 1,
          del: 0,
        },
      });
      if (billInprocess) {
        userBill.bill = billInprocess;
        userBill.user = await Users.findOne({
          where: {
            id: listBill[i].user_id,
            del: 0,
          },
        });

        userBill.shop = await Users.findOne({
          where: {
            id: listBill[i].shop_id,
            del: 0,
          },
        });

        let billList = await BillProduct.findAll({
          where: {
            bill_id: listBill[i].bill_id,
            del: 0,
          },
          order: [["createdAt", "DESC"]],
        });

        for (let j = 0; j < billList.length; j++) {
          let product = await Product.findOne({
            where: {
              id: billList[j].product_id,
              del: 0,
            },
          });
          let temp = {
            name: product.dataValues.name,
          };
          Object.assign(billList[j].dataValues, temp);
          userBill.billList.push(billList[j].dataValues);
        }

        listBillTotal.push(userBill);
      }
    }

    return {
      listBillTotal,
    };
  }


  async listOrderForUser(data) {
    let listBillTotal = [];
    let condition = {
      user_id: data.user_id,
      del: 0,
    };
    const [listBill, total] = await Promise.all([
      UserBill.findAll({
        where: condition,
        order: [["createdAt", "DESC"]],
      }),
      UserBill.count({
        where: condition,
      }),
    ]);

    for (let i = 0; i < listBill.length; i++) {
      let userBill = {
        user: {},
        billList: [],
        shop: {},
        bill: {},
        createAt: listBill[i].dataValues.createdAt,
      };
      let billInprocess = await Bill.findOne({
        where: {
          id: listBill[i].bill_id,
          del: 0,
        },
      });

      if (billInprocess.dataValues.status !== 0) {
        userBill.bill = billInprocess;
        userBill.user = await Users.findOne({
          where: {
            id: listBill[i].user_id,
            del: 0,
          },
        });

        userBill.shop = await Users.findOne({
          where: {
            id: listBill[i].shop_id,
            del: 0,
          },
        });

        let billList = await BillProduct.findAll({
          where: {
            bill_id: listBill[i].bill_id,
            del: 0,
          },
          order: [["createdAt", "DESC"]],
        });

        for (let j = 0; j < billList.length; j++) {
          let product = await Product.findOne({
            where: {
              id: billList[j].product_id,
              del: 0,
            },
          });
          let temp = {
            name: product.dataValues.name,
          };
          Object.assign(billList[j].dataValues, temp);
          userBill.billList.push(billList[j].dataValues);
        }

        listBillTotal.push(userBill);
      }
    }

    return {
      listBillTotal,
    };
  }

  async listSuccessForSeller(data) {
    let listBillTotal = [];
    let totalBill = {
      total: 0
    };
    let condition = {
      shop_id: data.shop_id,
      del: 0,
    };
    const [listBill, total] = await Promise.all([
      UserBill.findAll({
        where: condition,
        order: [["createdAt", "DESC"]],
      }),
      UserBill.count({
        where: condition,
      }),
    ]);

    for (let i = 0; i < listBill.length; i++) {
      let userBill = {
        user: {},
        billList: [],
        shop: {},
        bill: {},
        createAt: listBill[i].dataValues.createdAt,
      };
      let billInprocess = await Bill.findOne({
        where: {
          id: listBill[i].bill_id,
          status: 4,
          del: 0,
        },
      });


      if (billInprocess) {
        totalBill.total += billInprocess.dataValues.total_price;
        userBill.bill = billInprocess;
        userBill.user = await Users.findOne({
          where: {
            id: listBill[i].user_id,
            del: 0,
          },
        });

        userBill.shop = await Users.findOne({
          where: {
            id: listBill[i].shop_id,
            del: 0,
          },
        });

        let billList = await BillProduct.findAll({
          where: {
            bill_id: listBill[i].bill_id,
            del: 0,
          },
          order: [["createdAt", "DESC"]],
        });

        for (let j = 0; j < billList.length; j++) {
          let product = await Product.findOne({
            where: {
              id: billList[j].product_id,
              del: 0,
            },
          });
          let temp = {
            name: product.dataValues.name,
          };
          Object.assign(billList[j].dataValues, temp);
          userBill.billList.push(billList[j].dataValues);
        }

        listBillTotal.push(userBill);
      }


    }
    listBillTotal.push(totalBill)
    return {
      listBillTotal,
    };
  }

  async listCancelForSeller(data) {
    let listBillTotal = [];
    let condition = {
      shop_id: data.shop_id,
      del: 0,
    };
    const [listBill, total] = await Promise.all([
      UserBill.findAll({
        where: condition,
        order: [["createdAt", "DESC"]],
      }),
      UserBill.count({
        where: condition,
      }),
    ]);

    for (let i = 0; i < listBill.length; i++) {
      let userBill = {
        user: {},
        billList: [],
        shop: {},
        bill: {},
        createAt: listBill[i].dataValues.createdAt,
      };
      let billInprocess = await Bill.findOne({
        where: {
          id: listBill[i].bill_id,
          status: 3,
          del: 0,
        },
      });
      if (billInprocess) {
        userBill.bill = billInprocess;
        userBill.user = await Users.findOne({
          where: {
            id: listBill[i].user_id,
            del: 0,
          },
        });

        userBill.shop = await Users.findOne({
          where: {
            id: listBill[i].shop_id,
            del: 0,
          },
        });

        let billList = await BillProduct.findAll({
          where: {
            bill_id: listBill[i].bill_id,
            del: 0,
          },
          order: [["createdAt", "DESC"]],
        });

        for (let j = 0; j < billList.length; j++) {
          let product = await Product.findOne({
            where: {
              id: billList[j].product_id,
              del: 0,
            },
          });
          let temp = {
            name: product.dataValues.name,
          };
          Object.assign(billList[j].dataValues, temp);
          userBill.billList.push(billList[j].dataValues);
        }

        listBillTotal.push(userBill);
      }
    }

    return {
      listBillTotal,
    };
  }


  async listShipForSeller(data) {
    let listBillTotal = [];
    let totalBill = {
      total: 0
    };
    let condition = {
      shop_id: data.shop_id,
      del: 0,
    };
    const [listBill, total] = await Promise.all([
      UserBill.findAll({
        where: condition,
        order: [["createdAt", "DESC"]],
      }),
      UserBill.count({
        where: condition,
      }),
    ]);

    for (let i = 0; i < listBill.length; i++) {
      let userBill = {
        user: {},
        billList: [],
        shop: {},
        bill: {},
        createAt: listBill[i].dataValues.createdAt,
      };
      let billInprocess = await Bill.findOne({
        where: {
          id: listBill[i].bill_id,
          status: 2,
          del: 0,
        },
      });


      if (billInprocess) {
        totalBill.total += billInprocess.dataValues.total_price;
        userBill.bill = billInprocess;
        userBill.user = await Users.findOne({
          where: {
            id: listBill[i].user_id,
            del: 0,
          },
        });

        userBill.shop = await Users.findOne({
          where: {
            id: listBill[i].shop_id,
            del: 0,
          },
        });

        let billList = await BillProduct.findAll({
          where: {
            bill_id: listBill[i].bill_id,
            del: 0,
          },
          order: [["createdAt", "DESC"]],
        });

        for (let j = 0; j < billList.length; j++) {
          let product = await Product.findOne({
            where: {
              id: billList[j].product_id,
              del: 0,
            },
          });
          let temp = {
            name: product.dataValues.name,
          };
          Object.assign(billList[j].dataValues, temp);
          userBill.billList.push(billList[j].dataValues);
        }

        listBillTotal.push(userBill);
      }


    }
    listBillTotal.push(totalBill)
    return {
      listBillTotal,
    };
  }


  async acceptBill(data) {
    let objDelete = await Bill.findOne({
      where: {
        id: data.id,
        del: 0,
      },
    });
    let dataDelete = {
      status: 2,
    };
    objDelete.update(dataDelete);
    let billProduct = await BillProduct.findAll({
      where: {
        bill_id: data.id,
        del: 0,
      },
    })
    for (let i = 0; i < billProduct.length; i++) {
      let productTemp = await Product.findOne({
        where: {
          id: billProduct[i].dataValues.product_id,
          del: 0,
        },
      });

      let productUpdate = {
        quantity: productTemp.dataValues.quantity - billProduct[i].dataValues.quantity
      };
      productTemp.update(productUpdate);
    }
  }
  async cancelBill(data) {

    let objDelete = await Bill.findOne({
      where: {
        id: data.id,
        del: 0,
      },
    });

    let dataDelete = {
      status: 3,
    };

    objDelete.update(dataDelete);
  }

  async completeBill(data) {
    let objDelete = await Bill.findOne({
      where: {
        id: data.id,
        del: 0,
      },
    });
    let dataDelete = {
      status: 4,
    };

    objDelete.update(dataDelete);
  }
}

export default new MidBill();
