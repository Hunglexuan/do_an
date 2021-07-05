import {
    Role, Users, Voucher
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
    async searchRole(data) {
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

        const [listRole, total] = await Promise.all([
            Role.findAll({
                where: condition,
                order: [[
                    data.typeOrder === 'name' ? 'name' : 'createdAt',
                    data.stateOrder === 'up' ? 'ASC' : 'DESC'
                ]],
                limit,
                offset: (page - 1) * limit
            }),
            Role.count({
                where: condition
            })
        ])
       

        return {
            listRole,
            total: total || 0
        }

    }
    async createRole(data) {
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