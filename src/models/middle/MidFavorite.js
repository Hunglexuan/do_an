import {
    Role, Users, Feedback, Bill, UserBill, BillProduct, Product, Favorite,
} from '../core';
import { Op } from 'sequelize';
import { checkPassword, hashPassword } from '../../libs/encrypt';
import { generateToken } from '../../libs/token';
import { ERROR_MESSAGE } from '../../config/error';
import { sendMailActiveOrder, sendMailForgotPassword } from '../../libs/sendmail';
import { v4 as uuidv4 } from 'uuid';
import { password } from '../../config/database';
import { name } from 'ejs';

class MidFavorite {

    async createFavor(data) {

        let dataCreate = {
            product_id: data.product_id,
            user_id: data.user_id,
            del: 0,
        };
        let object = await Favorite.create(dataCreate);
        if (!object) {
            console.log('MidFavorite-createFavor: ERROR-24');
        }
        console.log('MidFavorite-createFavor: Success');
        return
    }
    async deleteFavor(data) {

        let objDelete = await Favorite.findOne({
            where: {
                product_id: data.product_id,
                user_id: data.user_id,
                del: 0
            }
        })
        let dataDelete = {
            del: 1,
        }

        objDelete.update(dataDelete)
    }
}


export default new MidFavorite()