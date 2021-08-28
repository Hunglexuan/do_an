import {
    Role,
    Users,
    Feedback,
    Bill,
    UserBill,
    BillProduct,
    Product,
    Favorite,
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
            console.log('MidFavorite-createFavor: ERROR-31');
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
    async searchFavorite(data) {
        let productList = [];
        let condition = {
            del: 0,
            user_id: data.user_id
        }
        const [listVoucher, total] = await Promise.all([
            Favorite.findAll({
                where: condition,
                order: [
                    [
                        "createdAt", "DESC"
                    ]
                ],
            }),
            Favorite.count({
                where: condition
            })
        ])
        for (let i = 0; i < listVoucher.length; i++) {
            let product = await Product.findOne({
                where: {
                    id: listVoucher[i].product_id,
                    del: 0
                }
            })
            productList.push(product)
        }
        return {
            productList,
            total: total || 0
        }

    }
}


export default new MidFavorite()