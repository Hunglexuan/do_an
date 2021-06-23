import {
    Role,Users,Feedback
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
async creatFeedback(data){
    if (!data.user_id) {
        throw new Error(ERROR_MESSAGE.FEEDBACK.FEEDBACK_USER_ID);
    }
    if (!data.shop_id) {
        throw new Error(ERROR_MESSAGE.FEEDBACK.FEEDBACK_SHOP_ID);
    }
    if (!data.content) {
        throw new Error(ERROR_MESSAGE.FEEDBACK.FEEDBACK_CONTENT);
    }
    if (!data.rate) {
        throw new Error(ERROR_MESSAGE.FEEDBACK.FEEDBACK_RATE);
    }
    let dataCreate = {
        user_id: data.user_id,
        shop_id: data.shop_id,
        content: data.content,
        rate: data.rate,
        del: 0
    }
    return await Feedback.create(dataCreate);
}
async deleteFeedback(data) {
    let objDelete = await Feedback.findOne({
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
async updateFeedback(data) {
    if (!data.id) {
        throw new Error(ERROR_MESSAGE.FEEDBACK.FEEDBACK_NOT_EXIST);
    }
    let objUpdate = await Feedback.findOne({
        where: {
            user_id: data.user_id,
            shop_id: data.shop_id,
            content: data.content,
            rate: data.rate,
            del: 0
        }
    })

    let dataUpdate = {
        name: data.name,
    }
    return await objUpdate.update(dataUpdate)

}

}


export default new MidFeedback()