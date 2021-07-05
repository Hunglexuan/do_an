import {
    Role,Users,Category
} from '../core';
import { Op } from 'sequelize';
import { checkPassword, hashPassword } from '../../libs/encrypt';
import { generateToken } from '../../libs/token';
import { ERROR_MESSAGE } from '../../config/error';
import { sendMailActiveOrder, sendMailForgotPassword } from '../../libs/sendmail';
import { v4 as uuidv4 } from 'uuid';
import { password } from '../../config/database';
import { name } from 'ejs';

class MidCategory {
    async searchCategory(data) {
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

        const [listCategory, total] = await Promise.all([
            Category.findAll({
                where: condition,
                order: [[
                    data.typeOrder === 'name' ? 'name' : 'createdAt',
                    data.stateOrder === 'up' ? 'ASC' : 'DESC'
                ]],
                limit,
                offset: (page - 1) * limit
            }),
            Category.count({
                where: condition
            })
        ])
        return {
            listCategory,
            total: total || 0
        }

    }
async createCategory(data){
    if (!data.name) {
        throw new Error(ERROR_MESSAGE.ROLE.ROLE_NOT_EXIST);
    }
    let dataCreate = {
        name: data.name,
        del: 0
    }
    return await Category.create(dataCreate);
}
async deleteCategory(data) {
    let objDelete = await Category.findOne({
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
async updateCategory(data) {
    if (!data.id) {
        throw new Error(ERROR_MESSAGE.ROLE.ROLE_EXIST);
    }
    let objUpdate = await Category.findOne({
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


export default new MidCategory()