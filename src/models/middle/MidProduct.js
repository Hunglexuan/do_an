import {
    Role,Users,Product
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
async createProduct(data){
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
    if (!data.sale) {
        throw new Error(ERROR_MESSAGE.PRODUCT.PRODUCT_SALE);
    }
    if (!data.sale_from) {
        throw new Error(ERROR_MESSAGE.PRODUCT.PRODUCT_SALE_FROM);
    }
    if (!data.sale_to) {
        throw new Error(ERROR_MESSAGE.PRODUCT.PRODUCT_SALE_TO);
    }
    let dataCreate = {
        name: data.name,
        quantity: data.quantity,
        unit_price: data.unit_price,
        description: data.description,
        user_id: data.user_id,
        sale: data.sale,
        sale_from: data.sale_from,
        sale_to: data.sale_to,
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
        sale: data.sale,
        sale_from: data.sale_from,
        sale_to: data.sale_to,
    }
    return await objUpdate.update(dataUpdate)

}

}


export default new MidProduct()