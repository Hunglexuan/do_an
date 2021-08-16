import {
    Role, Users, Bill, UserBill, Voucher, BillProduct, Product
} from '../core';
import { Op } from 'sequelize';
import { checkPassword, hashPassword } from '../../libs/encrypt';
import { generateToken } from '../../libs/token';
import { ERROR_MESSAGE } from '../../config/error';
import { sendMailActiveOrder, sendMailForgotPassword } from '../../libs/sendmail';
import { v4 as uuidv4 } from 'uuid';
import database, { password } from '../../config/database';
import { name } from 'ejs';

class MidBill {

    async cancelBill(data) {
        let objCancel = await Bill.findOne({
            where: {
                id: data.id,
                del: 0
            }
        })
        let dataCancel = {
            status: 2,
        }

        objCancel.update(dataCancel)
    }

    async searchBillUser(data) {
        let listBillTotal = []
        let condition = {
            del: 0
        }
        const [listBill, total] = await Promise.all([
            UserBill.findAll({
                where: condition,
                order: [[
                    "createdAt", "DESC"
                ]],
            }),
            UserBill.count({
                where: condition
            })
        ])
        for (let i = 0; i < listBill.length; i++) {
            let userBill = {
                user: {},
                bill: [],
                shop: {},
            }
            userBill.user = await User.findOne({
                where: {
                    id: data.user_id,
                    del: 0
                }
            })
            userBill.shop = await User.findOne({
                where: {
                    id: data.shop_id,
                    del: 0
                }
            })
            let bill = await Bill.findOne({
                where: {
                    id: data.bill_id,
                    del: 0
                }
            })
            let billList = BillProduct.findAll({
                where: {
                    bill_id: bill.id
                },
                order: [[
                    "createdAt", "DESC"
                ]],
            });
            for (let j = 0; j < billList.length; j++) {

                let bill = await Product.findOne({
                    where: {
                        id: billList[j].product_id,
                        del: 0
                    }
                })
                userBill.bill.push(bill)
            }

            listBillTotal.push(userBill);

        }

        return {
            listBillTotal
        }

    }

    async listCart(data) {
        let cart = {
            shopID: '',
            userID: data.userID,
            billID: '',
            status: null,
            address: '',
            voucherCode: '',
            listCart: [],

        }
        let billList = await UserBill.findAll({
            where: {
                user_id: data.userID,
            }
        })
        let billTemp
        for (let i = 0; i < billList.length; i++) {
            billTemp = await Bill.findOne({
                where: {
                    id: billList[i].bill_id,
                    status: null,
                }
            })

        }
        if (billTemp) {
            let shopIDTemp = await UserBill.findOne({
                where: {
                    bill_id: billTemp.dataValues.id,
                }
            })

            cart.shopID = shopIDTemp.dataValues.shop_id;
            let listTemp = await BillProduct.findAll({
                where: {
                    bill_id: billTemp.dataValues.id,
                }
            })
            for (let j = 0; j < listTemp.length; j++) {
                let objProduct = await Product.findOne({
                    where: {
                        id: listTemp[j].product_id
                    }
                })
                cart.listCart.push({
                    count: listTemp[j].quantity,
                    id: listTemp[j].product_id,
                    name: objProduct.name,
                    price: objProduct.unit_price,
                })

            }
            if (billTemp.dataValues.voucher_id) {
                let voucher = await Voucher.findOne({
                    where: {
                        id: billTemp.dataValues.voucher_id,
                        del: 0,
                    }
                })
                cart.voucherCode = voucher.code
            }
            cart.billID = billTemp.dataValues.id;
            cart.address = billTemp.dataValues.address;
            cart.status = billTemp.dataValues.status;
            return cart;
        }
        else {
            return {}
        }


    }
    async createBill(data) {
        let totalPrice = 0;
        let voucher

        if (data.cart.billID) {
            let billTemp = await Bill.findOne({
                where: {
                    id: data.cart.billID,
                    status: '',
                }
            })
            if (billTemp) {
                for (let i = 0; i < data.cart.listCart.length; i++) {
                    totalPrice += data.cart.listCart[i].price * data.cart.listCart[i].count
                }
                if (data.cart.voucherCode != '') {
                    voucher = await Voucher.findOne({
                        where: {
                            code: data.cart.voucherCode,
                            del: 0
                        }
                    })
                    totalPrice -= voucher.discount_number
                }
                else {
                    voucher = ''
                }
                let status = data.cart.status;
                if (!data.cart.address) {
                    throw new Error("Chưa nhập địa chỉ ship");
                }
                let address = data.cart.address;
                let billUpdate = {
                    total_price: totalPrice,
                    status: status,
                    address: address,
                }
                let bill = await billTemp.update(billUpdate);
                let billProductList = await BillProduct.findAll({
                    where: {
                        bill_id: billTemp.id,
                        del: 0
                    }
                })
                let dataDelete = {
                    del: 1,
                }
                for (let k = 0; k < billProductList.length; k++) {
                    await billProductList[k].update(dataDelete);
                }

                for (let i = 0; i < data.cart.listCart.length; i++) {
                    totalPrice += data.cart.listCart[i].price * data.cart.listCart[i].count
                    let billProduct = {
                        quantity: data.cart.listCart[i].count,
                        unit_price: data.cart.listCart[i].price,
                        total_price: data.cart.listCart[i].count * data.cart.listCart[i].price,
                        product_id: data.cart.listCart[i].id,
                        bill_id: bill.dataValues.id,
                    }
                    await BillProduct.create(billProduct)
                }
                let userBillList = await BillProduct.findOne({
                    where: {
                        bill_id: billTemp.id,
                        del: 0
                    }
                })
                let userBill = {
                    bill_id: billTemp.id,
                    user_id: data.cart.userID,
                    shop_id: data.cart.shopID,
                    del: 0,
                }
                await userBillList.update(userBill);
            }
        }
        else {
            for (let i = 0; i < data.cart.listCart.length; i++) {
                totalPrice += data.cart.listCart[i].price * data.cart.listCart[i].count
            }

            if (data.cart.voucherCode != '') {
                voucher = await Voucher.findOne({
                    where: {
                        code: data.cart.voucherCode,
                        del: 0
                    }
                })
                totalPrice -= voucher.discount_number
            }
            else {
                voucher = ''
            }
            let status = data.cart.status;
            if (!data.cart.address) {
                throw new Error("Chưa nhập địa chỉ ship");
            }
            let address = data.cart.address;
            let billCreate = {
                total_price: totalPrice,
                status: status,
                address: address,
                del: 0,
            }
            let bill = await Bill.create(billCreate);
            for (let i = 0; i < data.cart.listCart.length; i++) {
                totalPrice += data.cart.listCart[i].price * data.cart.listCart[i].count
                let billProduct = {
                    quantity: data.cart.listCart[i].count,
                    unit_price: data.cart.listCart[i].price,
                    total_price: data.cart.listCart[i].count * data.cart.listCart[i].price,
                    product_id: data.cart.listCart[i].id,
                    bill_id: bill.dataValues.id,
                    del: 0,
                }
                await BillProduct.create(billProduct)
            }
            let userBill = {
                bill_id: bill.dataValues.id,
                user_id: data.cart.userID,
                shop_id: data.cart.shopID,
                del: 0,
            }
            await UserBill.create(userBill);
        }
    }

    async deleteBill(data) {
        let objDelete = await Bill.findOne({
            where: {
                id: data.id,
                del: 0
            }
        })
        let dataDelete = {
            del: 1,
        }

        objDelete.update(dataDelete)
    }
    async updateBill(data) {
        if (!data.id) {
            throw new Error(ERROR_MESSAGE.BILL.BILL_NOT_EXIST);
        }
        let objUpdate = await Bill.findOne({
            where: {
                id: data.id,
                del: 0
            }
        })

        let dataUpdate = {
            quantity: data.quantity,
            total_price: data.total_price,
            voucher_id: data.voucher_id,
            status: data.status,
        }
        return await objUpdate.update(dataUpdate)

    }

}


export default new MidBill()