import {
    Role,Users,Voucher
} from '../core';
import { Op } from 'sequelize';
import { checkPassword, hashPassword } from '../../libs/encrypt';
import { generateToken } from '../../libs/token';
import { ERROR_MESSAGE } from '../../config/error';
import { sendMailActiveOrder, sendMailForgotPassword } from '../../libs/sendmail';
import { v4 as uuidv4 } from 'uuid';
import { password } from '../../config/database';
import { name } from 'ejs';

class MidVoucher {
async createVoucher(data){
    if (!data.code) {
        throw new Error(ERROR_MESSAGE.VOUCHER.VOUCHER_CODE);
    }
    if (!data.discount_number) {
        throw new Error(ERROR_MESSAGE.VOUCHER.VOUCHER_DISCOUNT_NUMBER);
    }
    let dataCreate = {
        code: data.code,
        discount_number: data.discount_number,
        del: 0
    }
    return await Voucher.create(dataCreate);
}
async deleteVoucher(data) {
    let objDelete = await Voucher.findOne({
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
async updateVoucher(data) {
    if (!data.id) {
        throw new Error(ERROR_MESSAGE.ROLE.ROLE_EXIST);
    }
    let objUpdate = await Voucher.findOne({
        where: {
            id: data.id,
            del: 0
        }
    })

    let dataUpdate = {
        code: data.code,
        discount_number: data.discount_number,
    }
    return await objUpdate.update(dataUpdate)

}

}

export default new MidVoucher()