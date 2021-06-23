import {
    Role,Users
} from '../core';
import { Op } from 'sequelize';
import { checkPassword, hashPassword } from '../../libs/encrypt';
import { generateToken } from '../../libs/token';
import { ERROR_MESSAGE } from '../../config/error';
import { sendMailActiveOrder, sendMailForgotPassword } from '../../libs/sendmail';
import { v4 as uuidv4 } from 'uuid';
import { password } from '../../config/database';
import { name } from 'ejs';

class MidRole {
async creatRole(data){
    if (!data.name) {
        throw new Error(ERROR_MESSAGE.ROLE.ROLE_NOT_EXIST);
    }
    let dataCreate = {
        name: data.name,
        del: 0
    }
    return await Role.create(dataCreate);
}
async deleteRole(data) {
    let objDelete = await Role.findOne({
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
async updateRole(data) {
    if (!data.id) {
        throw new Error(ERROR_MESSAGE.ROLE.ROLE_EXIST);
    }
    let objUpdate = await Role.findOne({
        where: {
            id: data.id,
            del: 0
        }
    })

    let dataUpdate = {
        name: data.name,
    }
    return await objUpdate.update(dataUpdate)

}

}


export default new MidRole()