import {
    Role,Users,BillTemp
} from '../core';
import { Op } from 'sequelize';
import { checkPassword, hashPassword } from '../../libs/encrypt';
import { generateToken } from '../../libs/token';
import { ERROR_MESSAGE } from '../../config/error';
import { sendMailActiveOrder, sendMailForgotPassword } from '../../libs/sendmail';
import { v4 as uuidv4 } from 'uuid';
import { password } from '../../config/database';
import { name } from 'ejs';

class MidBillTemp {
async createBillTemp(data){

    if (!data.bill_id) {
        throw new Error(ERROR_MESSAGE.BillTemp.BILL_TEMP_BILL_ID);
    }
    if (!data.bill_product_id) {
        throw new Error(ERROR_MESSAGE.BillTemp.BILL_TEMP_BILL_PRODUCT_ID);
    }
    let dataCreate = {
        bill_id: data.bill_id,
        bill_product_id: data.bill_product_id,
        del: 0
    }
    return await BillTemp.create(dataCreate);
}
async deleteBillTemp(data) {
    let objDelete = await BillTemp.findOne({
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
async updateBillTemp(data) {
    if (!data.id) {
        throw new Error(ERROR_MESSAGE.VOUCHER.BILL_TEMP_NOT_EXIST);
    }
    let objUpdate = await BillTemp.findOne({
        where: {
            id: data.id,
            del: 0
        }
    })

    let dataUpdate = {
        bill_id: data.bill_id,
        bill_product_id: data.bill_product_id,
    }
    return await objUpdate.update(dataUpdate)

}

}


export default new MidBillTemp()