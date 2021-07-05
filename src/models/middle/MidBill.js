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
    async searchBill(data) {
        let condition = {
            del: 0
        }
        if (data.name) {
            condition.name = {
                [Op.like]: `%${data.name}%`
            }
        }

        let { page, limit } = data;
        page = page ? parseInt(page) : 1;
        limit = limit ? parseInt(limit) : 10;

        const [listBill, total] = await Promise.all([
            Bill.findAll({
                where: condition,
                order: [[
                    data.typeOrder === 'name' ? 'name' : 'createdAt',
                    data.stateOrder === 'up' ? 'ASC' : 'DESC'
                ]],
                limit,
                offset: (page - 1) * limit
            }),
            Bill.count({
                where: condition
            })
        ])
        return {
            listBill,
            total: total || 0
        }

    }
async createBill(data){
    if (!data.quantity) {
        throw new Error(ERROR_MESSAGE.BILL.BILL_QUANTITY);
    }
    if (!data.total_price) {
        throw new Error(ERROR_MESSAGE.BILL.BILL_TOTAL_PRICE);
    }

    if (!data.status) {
        throw new Error(ERROR_MESSAGE.BILL.BILL_STATUS);
    }
    let dataCreate = {
        quantity: data.quantity,
        total_price: data.total_price,
        // voucher_id: data.voucher_id,
        status : data.status,
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
        status : data.status,
    }
    return await objUpdate.update(dataUpdate)

}

}


export default new MidBill()