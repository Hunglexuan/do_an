import { Role, Users, Comment, Product } from "../core";
import { Op } from "sequelize";
import { checkPassword, hashPassword } from "../../libs/encrypt";
import { generateToken } from "../../libs/token";
import { ERROR_MESSAGE } from "../../config/error";

import { v4 as uuidv4 } from "uuid";
import { password } from "../../config/database";
import { name } from "ejs";

class MidComment {
  async searchComment(data) {
    if (!data.id) {
      console.log("MidComment-searchComment: ErrorCode-17");
      throw new Error(ERROR_MESSAGE.COMMENT.COMMENT_NOT_EXIST);
    }
    let obj = await Product.findOne({
      where: {
        id: data.id,
        del: 0,
      },
    });
    let condition = {
      product_id: obj.id,
      del: 0,
    };

    const [listComment, total] = await Promise.all([
      Comment.findAll({
        where: condition,
        order: [["createdAt", "DESC"]],
      }),
      Comment.count({
        where: condition,
      }),
    ]);

    if (listComment) {
      console.log("MidComment-searchComment: SUCCESS ");
    } else {
      console.log("MidComment-searchComment: ERROR-49 ");
    }
    return {
      listComment,
      total: total || 0,
    };
  }

  async notifyCommentUser(data) {
    let listCmtChild = [];
    let condition = {
      user_id: data.user_id,
      del: 0,
    };

    let listComment = await Comment.findAll({
      where: condition,
      order: [["createdAt", "DESC"]],
    });

    for (let i = 0; i < listComment.length; i++) {
      let listCmtTemp = await Comment.findAll({
        where: {
          cmt_id: listComment[i].dataValues.id,
          del: 0,
        },
        order: [["createdAt", "DESC"]],
      });

      if (listCmtTemp.length != 0) {
        for (let j = 0; j < listCmtTemp.length; j++) {
          let product = await Product.findOne({
            where: {
              id: listCmtTemp[j].dataValues.product_id,
              del: 0,
            },
          });

          let temp = {
            image: product.dataValues.image,
            name: product.dataValues.name,
          };
          Object.assign(listCmtTemp[j].dataValues, temp);
        }
        listCmtChild.push(listCmtTemp);
      }
    }
    return {
      listCmtChild,
    };
  }
  async createComment(data) {
    if (!data.user_id) {
      console.log("MidComment-createComment: ERROR-105 ");
      throw new Error(ERROR_MESSAGE.COMMENT.COMMENT_USER_ID);
    }
    if (!data.product_id) {
      console.log("MidComment-searchComment: ERROR-109 ");
      throw new Error(ERROR_MESSAGE.COMMENT.COMMNET_SHOP_ID);
    }
    if (!data.content) {
      console.log("MidComment-searchComment: ERROR-113 ");
      throw new Error(ERROR_MESSAGE.COMMENT.COMMENT_CONTENT);
    }
    let dataCreate = {
      user_id: data.user_id,
      product_id: data.product_id,
      content: data.content,
      cmt_id: data.cmt_id,
      del: 0,
    };
    let object = await Comment.create(dataCreate);
    if (!object) {
      console.log("MidComment-searchComment: ERROR-125 ");
    }
    console.log("MidComment-searchComment: SUCCESS");

    return object;
  }
  async deleteComment(data) {
    if (!data.id) {
      console.log("MidComment-deleteComment: ERROR-133 ");
      throw new Error(ERROR_MESSAGE.COMMENT.COMMENT_NOT_EXIST);
    }
    let objDelete = await Comment.findOne({
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
  async updateComment(data) {
    if (!data.id) {
      console.log("MidComment-updateComment: ERROR-150 ");
      throw new Error(ERROR_MESSAGE.COMMENT.COMMENT_NOT_EXIST);
    }
    let objUpdate = await Comment.findOne({
      where: {
        id: data.id,
        del: 0,
      },
    });

    let dataUpdate = {
      content: data.content,
    };
    let object = await objUpdate.update(dataUpdate);
    if (!object) {
      console.log("MidComment-updateComment: ERROR-165 ");
    }
    console.log("MidComment-updateComment: SUCCESS ");
    return object;
  }
  async notifyCommentSeller(data) {
    let listCmt = [];
    let condition = {
      user_id: data.user_id,
      del: 0,
    };
    let listProduct = await Product.findAll({
      where: condition,
      order: [["createdAt", "DESC"]],
    });
    for (let i = 0; i < listProduct.length; i++) {

      let listComment = await Comment.findAll({
        where: {
          product_id: listProduct[i].dataValues.id
        },
        order: [["createdAt", "DESC"]],
      });

      if (listComment.length != 0) {
    
        for (let j = 0; j < listComment.length; j++) {
          let product = await Product.findOne({
            where: {
              id: listComment[j].dataValues.product_id,
              del: 0,
            },
          });
          let temp = {
            image: product.dataValues.image,
            name: product.dataValues.name,
          };
          Object.assign(listComment[j].dataValues, temp);
          let user = await Users.findOne({
            where: {
              id: listComment[j].dataValues.user_id,
              del: 0,
            },
          });
          let temp1 = {
           
            userName: user.dataValues.name,
          };
          Object.assign(listComment[j].dataValues, temp1);

          listCmt.push(listComment[j].dataValues);
        }
       
      }
    }
    return {
      listCmt,
    };
  }
}

export default new MidComment();
