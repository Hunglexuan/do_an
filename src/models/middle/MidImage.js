import {
    Role,Users,Image
} from '../core';
import { Op } from 'sequelize';
import { checkPassword, hashPassword } from '../../libs/encrypt';
import { generateToken } from '../../libs/token';
import { ERROR_MESSAGE } from '../../config/error';
import { sendMailActiveOrder, sendMailForgotPassword } from '../../libs/sendmail';
import { v4 as uuidv4 } from 'uuid';
import { password } from '../../config/database';
import { name } from 'ejs';

class MidImage {
async creatImage(data){
    if (!data.prodcut_id) {
        throw new Error(ERROR_MESSAGE.IMAGE.IMAGE_PRODUCT_ID);
    }
    if (!data.link) {
        throw new Error(ERROR_MESSAGE.IMAGE.IMAGE_LINK);
    }
    let dataCreate = {
        prodcut_id: data.prodcut_id,
        link:data.link,
        del: 0
    }
    return await Image.create(dataCreate);
}
async deleteImage(data) {
    let objDelete = await Image.findOne({
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
async updateImage(data) {
    if (!data.id) {
        throw new Error(ERROR_MESSAGE.IMAGE.IMAGE_NOT_EXIST);
    }
    let objUpdate = await Image.findOne({
        where: {
            id: data.id,
            del: 0
        }
    })

    let dataUpdate = {
        prodcut_id: data.prodcut_id,
        link:data.link,
    }
    return await objUpdate.update(dataUpdate)

}

}


export default new MidImage()