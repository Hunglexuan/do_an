import {
    Role,Users,Voucher
} from '../core';
import { Op } from 'sequelize';
import { checkPassword, hashPassword } from '../../libs/encrypt';
import { generateToken } from '../../libs/token';
import { ERROR_MESSAGE } from '../../config/error';
import { v4 as uuidv4 } from 'uuid';
import { password } from '../../config/database';
import { name } from 'ejs';

class MidVoucher {

    async getVoucherById(data) {
        if(!data.code){
            console.log('MidVoucher-getVoucherById: ErrorCode-17');
            throw new Error(ERROR_MESSAGE.VOUCHER.VOUCHER_CODE);
        }
        return Voucher.findOne({
            where: {
                code: data.code,
                del: 0,
            },
        });
    }
    async searchVoucher(data) {
        let condition = {
            del: 0
        }
        if (data.name) {
            condition.name = {
                [Op.like]: `%${data.name}%`
            }
        }
        const [listVoucher, total] = await Promise.all([
            Voucher.findAll({
                where: condition,
                order: [[
                    "createdAt", "DESC"
                ]],
            }),
            Voucher.count({
                where: condition
            })
        ])
        if(!listVoucher){
            console.log('MidVoucher-createVoucher: ErrorCode-44');
        }console.log('MidVoucher-createVoucher: SUCCESS');
        return {
            listVoucher,
            total: total || 0
        }

    }
async createVoucher(data){
    if (!data.code) {
        console.log('MidVoucher-createVoucher: ErrorCode-51');
        throw new Error(ERROR_MESSAGE.VOUCHER.VOUCHER_CODE);
    }
    if (!data.discount_number) {
        console.log('MidVoucher-createVoucher: ErrorDiscount-55');
        throw new Error(ERROR_MESSAGE.VOUCHER.VOUCHER_DISCOUNT_NUMBER);
    }
    let dataCreate = {
        code: data.code,
        discount_number: data.discount_number,
        description : data.description,
        del: 0
    }
    let object = await Voucher.create(dataCreate);
    if(!object){
        console.log('MidVoucher-createVoucher:ERROR-65');
    }
    console.log('MidVoucher-createVoucher: SUCCESS ');
    return object
}
async deleteVoucher(data) {
    if (!data.id) {
        console.log('MidVoucher-deleteVoucher: ERROR-72');
        throw new Error('Voucher is not exist');

    }
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
        console.log('MidVoucher-updateVoucher: ERROR-97');
        throw new Error('Voucher is not exist');

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
        description : data.description,
    }
    let object = await objUpdate.update(dataUpdate)
    if(object )
    {
        console.log('MidVoucher-updateVoucher: SUCCESS ');
    }else{
        console.log('MidVoucher-updateVoucher: ERROR');
    }
    return object.message

}

}

export default new MidVoucher()