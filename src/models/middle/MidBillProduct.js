import {
    Role,Users,BillProduct
} from '../core';
import { Op } from 'sequelize';
import { checkPassword, hashPassword } from '../../libs/encrypt';
import { generateToken } from '../../libs/token';
import { ERROR_MESSAGE } from '../../config/error';
import { sendMailActiveOrder, sendMailForgotPassword } from '../../libs/sendmail';
import { v4 as uuidv4 } from 'uuid';
import { password } from '../../config/database';
import { name } from 'ejs';

class MidBillProduct {
async creatBillProduct(data){
    if (!data.quantity) {
        throw new Error(ERROR_MESSAGE.BILL_PRODUCT.BILL_PRODUCT_QUANTITY);
    }
    if (!data.total_price) {
        throw new Error(ERROR_MESSAGE.BILL_PRODUCT.BILL_PRODUCT_TOTAL_PRICE);
    }
    if (!data.unit_price) {
        throw new Error(ERROR_MESSAGE.BILL_PRODUCT.BILL_PRODUCT_UNIT_PRICE);
    }
    if (!data.product_id) {
        throw new Error(ERROR_MESSAGE.BILL_PRODUCT.BILL_PRODUCT_ID);
    }
    let dataCreate = {
        quantity:data.quantity,
        unit_price:data.unit_price,
        total_price:data.total_price,
        product_id:data.product_id,
        del: 0
    }
    return await BillProduct.create(dataCreate);
}
async deleteBillProduct(data) {
    let objDelete = await BillProduct.findOne({
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
async updateBillProduct(data) {
    if (!data.id) {
        throw new Error(ERROR_MESSAGE.BILL_PRODUCT.BILL_PRODUCT_NOT_EXIST);
    }
    let objUpdate = await BillProduct.findOne({
        where: {
            id: data.id,
            del: 0
        }
    })

    let dataUpdate = {
        quantity:data.quantity,
        unit_price:data.unit_price,
        total_price:data.total_price,
        product_id:data.product_id,
    }
    return await objUpdate.update(dataUpdate)

}

}


export default new MidBillProduct()