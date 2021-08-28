import {
    Role,
    Users,
    Feedback,
    Bill,
    UserBill,
    BillProduct,
    Product,
} from '../core';
import { Op } from 'sequelize';
import { checkPassword, hashPassword } from '../../libs/encrypt';
import { generateToken } from '../../libs/token';
import { ERROR_MESSAGE } from '../../config/error';
import { sendMailActiveOrder, sendMailForgotPassword } from '../../libs/sendmail';
import { v4 as uuidv4 } from 'uuid';
import { password } from '../../config/database';
import { name } from 'ejs';

class MidFeedback {

    async checkPermissionFeedBack(data) {

        let user_bill = await UserBill.findOne({
            where: {
                user_id: data.user_id,
                shop_id: data.shop_id,
                del: 0
            }
        })
        if (user_bill) {
            let bill = await Bill.findOne({
                where: {
                    id: user_bill.dataValues.bill_id,
                    status: 4,
                    del: 0
                }
            })
            console.log(bill);
            if (bill) {
                console.log('aaa')
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }



    async searchFeedbackByShopId(data) {
        let shop = await Users.findOne({
            where: {
                id: data.id,
                del: 0
            }
        })
        let condition = {
            shop_id: shop.id,
            del: 0
        }


        const [listFeedback, total] = await Promise.all([
            Feedback.findAll({
                where: condition,
                order: [
                    [
                        "createdAt", "DESC"
                    ]
                ],
            }),
            Feedback.count({
                where: condition
            })
        ])
        let count = 0;
        let star_1 = 0;
        let star_2 = 0;
        let star_3 = 0;
        let star_4 = 0;
        let star_5 = 0;

        if (listFeedback) {
            for (let i = 0; i < listFeedback.length; i++) {
                count = count + listFeedback[i].rate;
                if (listFeedback[i].rate == 1) {
                    star_1++
                }
                if (listFeedback[i].rate == 2) {
                    star_2++
                }
                if (listFeedback[i].rate == 3) {
                    star_3++
                }
                if (listFeedback[i].rate == 4) {
                    star_4++
                }
                if (listFeedback[i].rate == 5) {
                    star_5++
                }

            }
        }
        if (!listFeedback) {
            console.log('MidFeedback-searchFeedback: ErrorCode-107');
        }
        console.log('MidFeedback-searchFeedback: Success');

        return {
            listFeedback,
            total: total || 0,
            count,
            star_1,
            star_2,
            star_3,
            star_4,
            star_5,
        }

    }
    async createFeedback(data) {
        if (!data.user_id) {
            console.log('MidFeedback-createFeedback: ErrorCode-125');
            throw new Error(ERROR_MESSAGE.FEEDBACK.FEEDBACK_USER_ID);
        }
        if (!data.shop_id) {
            console.log('MidFeedback-createFeedback: ErrorCode-129');
            throw new Error(ERROR_MESSAGE.FEEDBACK.FEEDBACK_SHOP_ID);
        }
        if (!data.content) {
            console.log('MidFeedback-createFeedback: ErrorCode-133');
            throw new Error(ERROR_MESSAGE.FEEDBACK.FEEDBACK_CONTENT);
        }
        if (!data.rate) {
            console.log('MidFeedback-createFeedback: ErrorCode-137');
            throw new Error(ERROR_MESSAGE.FEEDBACK.FEEDBACK_RATE);
        }
        let dataCreate = {
            user_id: data.user_id,
            shop_id: data.shop_id,
            content: data.content,
            rate: data.rate,
            del: 0
        }
        let object = await Feedback.create(dataCreate);
        if (!object) {
            console.log('MidFeedback-createFeedback: ErrorCode-149');
        }
        console.log('MidFeedback-createFeedback: Success');
        return object
    }


}


export default new MidFeedback()