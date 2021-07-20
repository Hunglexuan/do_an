import {
    Role,
    Users,
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

class MidProduct {
    async searchProduct(data) {
        let user = await Users.findOne({
            where: {
                id: data.id,
                del: 0
            }
        })
        if (user) {
            let role = await Role.findOne({
                where: {
                    id: user.role_id,
                    del: 0
                }
            })
            if (role.name != 'seller') {
                throw new Error('K co seller');
            }
        }
        let condition = {
            del: 0,
            user_id: user.id
        }

        if (data.name) {
            condition.name = {
                [Op.like]: `%${data.name}%`
            }
        }


        const [listProduct, total] = await Promise.all([
            Product.findAll({
                where: condition,
                order: [
                    [
                        "createdAt", "DESC"
                    ]
                ],

            }),
            Product.count({
                where: condition
            })
        ])

        return {
            listProduct,
            total: total || 0
        }

    }
    async createProduct(data) {
        if (!data.name) {
            throw new Error(ERROR_MESSAGE.PRODUCT.PRODUCT_NAME);
        }
        if (!data.quantity) {
            throw new Error(ERROR_MESSAGE.PRODUCT.PRODUCT_QUANTITY);
        }
        if (!data.unit_price) {
            throw new Error(ERROR_MESSAGE.PRODUCT.PRODUCT_UNIT_PRICE);
        }
        if (!data.description) {
            throw new Error(ERROR_MESSAGE.PRODUCT.PRODUCT_DESCRIPTION);
        }
        if (!data.user_id) {
            throw new Error(ERROR_MESSAGE.PRODUCT.PRODUCT_USER_ID);
        }

        let dataCreate = {
            name: data.name,
            quantity: data.quantity,
            unit_price: data.unit_price,
            description: data.description,
            user_id: data.user_id,

            del: 0
        }
        return await Product.create(dataCreate);
    }
    async deleteProduct(data) {
        let objDelete = await Product.findOne({
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
    async updateProduct(data) {
        if (!data.id) {
            throw new Error(ERROR_MESSAGE.PRODUCT.PRODUCT_NOT_EXIST);
        }
        let objUpdate = await Product.findOne({
            where: {
                id: data.id,
                del: 0
            }
        })

        let dataUpdate = {
            name: data.name,
            quantity: data.quantity,
            unit_price: data.unit_price,
            description: data.description,
            user_id: data.user_id,

        }
        return await objUpdate.update(dataUpdate)

    }

}


export default new MidProduct()