import {
    Role, Users, Bill, UserBill, Voucher
} from '../core';
import { Op } from 'sequelize';
import { checkPassword, hashPassword } from '../../libs/encrypt';
import { generateToken } from '../../libs/token';
import { ERROR_MESSAGE } from '../../config/error';
import { sendMailActiveOrder, sendMailForgotPassword } from '../../libs/sendmail';
import { v4 as uuidv4 } from 'uuid';
import database, { password } from '../../config/database';
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
                    "createdAt", "DESC"
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
    async createBill(data) {
        let totalPrice
        let voucher
        // if(billID){

        // }
        // else{

        // }
        for (let i = 0; i < data.cart.listCart.length; i++) {
            totalPrice += data.cart.listCart[i].price * data.cart.listCart[i].count
        }
        if (data.cart.voucherCode != '') {
            voucher = await Voucher.findOne({
                where: {
                    code: data.cart.voucherCode,
                    del: 0
                }
            })
            totalPrice += voucher.discount_number
        }
        let status = data.cart.status;
        if (!data.cart.address) {
            throw new Error("Chưa nhận địa chỉ ship");
        }
        let address = data.cart.address;
        let billCreate = {
            total_price: totalPrice,
            status: status,
            address: address,
        }

        let bill = await Bill.create(billCreate);

        let userBill = {
            bill_id: bill.data.id,
            user_id: data.cart.userId
        }
        await UserBill.create(userBill);

       
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
            status: data.status,
        }
        return await objUpdate.update(dataUpdate)

    }

}


export default new MidBill()