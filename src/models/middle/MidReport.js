import {
    Users,
    Report
} from '../core';
import { Op } from 'sequelize';
import { checkPassword, hashPassword } from '../../libs/encrypt';
import { generateToken } from '../../libs/token';
import { ERROR_MESSAGE } from '../../config/error';
import { sendMailActiveOrder, sendMailForgotPassword } from '../../libs/sendmail';
import { v4 as uuidv4 } from 'uuid';
import { password } from '../../config/database';
import { name } from 'ejs';

class MidReport {

    async getReportById(id) {
        return await Report.findOne({
            where: {
                id: id,
                del: 0
            }
        })
    }

    async createReport(data) {

        if (!data.type_report) {
            throw new Error(ERROR_MESSAGE.REPORT.REPORT_TYPE_NOT_EXIST);
        }
        if (!data.content) {
            throw new Error(ERROR_MESSAGE.REPORT.REPORT_CONTENT_NOT_EXIST)
        }
        if (!data.user_id) {
            throw new Error(ERROR_MESSAGE.REPORT.REPORT_USER_ID)
        }
        if (!data.shop_id) {
            throw new Error(ERROR_MESSAGE.REPORT.REPORT_SHOP_ID)
        }
        let user = await Users.findOne({
            where: {
                id: data.user_id
            }
        })
        let shop = await Users.findOne({
            where: {
                id: data.shop_id
            }
        })
        if (!user || !shop) {
            throw new Error(ERROR_MESSAGE.REPORT.REPORT_SHOP_ID_or_USER_ID)
        }
        let dataCreate = {
            type_report: data.type_report,
            content: data.content,
            user_id: data.user_id,
            shop_id: data.shop_id,
            del: 0
        }

        return await Report.create(dataCreate);
    }

    async searchReport(data) {
        let condition = {
            del: 0
        }
        
        const [listReport, total] = await Promise.all([
            Report.findAll({
                where: condition,
                order: [
                    [
                        ["createdAt", "ASC"],
                    ]
                ],
            }),
            Report.count({
                where: condition
            })
        ])
        return {
            listReport,
            total: total || 0
        }
    }
    async searchReportByShop(data) {
        let condition = {
            shop_id: data.id,
            del: 0
        }

        const [listReport, total] = await Promise.all([
            Report.findAll({
                where: condition,
                order: [
                    [
                        ["createdAt", "ASC"],
                    ]
                ],
            }),
            Report.count({
                where: condition
            })
        ])
        return {
            listReport,
            total: total || 0
        }
    }

}

export default new MidReport()