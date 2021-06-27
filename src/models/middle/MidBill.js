import {
    Role,Users,Bill
} from '../core';
import { Op } from 'sequelize';
import { checkPassword, hashPassword } from '../../libs/encrypt';
import { generateToken } from '../../libs/token';
import { ERROR_MESSAGE } from '../../config/error';
import { sendMailActiveOrder, sendMailForgotPassword } from '../../libs/sendmail';
import { v4 as uuidv4 } from 'uuid';
import { password } from '../../config/database';
import { name } from 'ejs';

class MidBill {
async createBill(data){
    if (!data.quantity) {
        throw new Error(ERROR_MESSAGE.BILL.BILL_QUANTITY);
    }
    if (!data.total_price) {
        throw new Error(ERROR_MESSAGE.BILL.BILL_TOTAL_PRICE);
    }
    if (!data.voucher_id) {
        throw new Error(ERROR_MESSAGE.BILL.BILL_VOUCHER_ID);
    }
    if (!data.status) {
        throw new Error(ERROR_MESSAGE.BILL.BILL_STATUS);
    }
    let dataCreate = {
        quantity: data.quantity,
        total_price: data.total_price,
        voucher_id: data.voucher_id,
        bill_status : data.bill_status,
        del: 0
    }
    return await Bill.create(dataCreate);
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
        bill_product_id: data.bill_product_id,
    }
    return await objUpdate.update(dataUpdate)

}

}


export default new MidBill()