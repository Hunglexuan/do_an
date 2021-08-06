import {
    Role,
    Users,
    Comment,
    Product
} from '../core';
import { Op } from 'sequelize';
import { checkPassword, hashPassword } from '../../libs/encrypt';
import { generateToken } from '../../libs/token';
import { ERROR_MESSAGE } from '../../config/error';
import { sendMailActiveOrder, sendMailForgotPassword } from '../../libs/sendmail';
import { v4 as uuidv4 } from 'uuid';
import { password } from '../../config/database';
import { name } from 'ejs';

class MidComment {
    async searchComment(data) {
        let obj = await Product.findOne({
            where: {
                id: data.id,
                del: 0
            }
        })
        let condition = {
            product_id: obj.id,
            del: 0
        }

        const [listComment, total] = await Promise.all([
            Comment.findAll({
                where: condition,
                order: [
                    [
                        "createdAt", "DESC"
                    ]
                ],

            }),
            Comment.count({
                where: condition
            })
        ])


        return {
            listComment,
            total: total || 0
        }

    }
    async createComment(data) {
        if (!data.user_id) {
            throw new Error(ERROR_MESSAGE.COMMENT.COMMENT_USER_ID);
        }
        if (!data.product_id) {
            throw new Error(ERROR_MESSAGE.COMMENT.COMMNET_SHOP_ID);
        }
        if (!data.content) {
            throw new Error(ERROR_MESSAGE.COMMENT.COMMENT_CONTENT);
        }
        let dataCreate = {
            user_id: data.user_id,
            product_id: data.product_id,
            content: data.content,
            cmt_id: data.cmt_id,
            del: 0
        }
        return await Comment.create(dataCreate);
    }
    async deleteComment(data) {
        let objDelete = await Comment.findOne({
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
    async updateComment(data) {
        if (!data.id) {
            throw new Error(ERROR_MESSAGE.COMMENT.COMMENT_NOT_EXIST);
        }
        let objUpdate = await Comment.findOne({
            where: {
                id: data.id,
                del: 0
            }
        })

        let dataUpdate = {
            user_id: data.user_id,
            product_id: data.product_id,
            content: data.content,
            cmt_id: data.cmt_id,
        }
        return await objUpdate.update(dataUpdate)

    }

}


export default new MidComment()