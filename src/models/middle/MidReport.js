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
import MidUser from './MidUser';

class MidReport {

    async getReportById(id) {
        if(!id){
            console.log('MidReport-getReportById: ErrorCode-18');
            throw new Error(ERROR_MESSAGE.REPORT.REPORT_SHOP_ID_or_USER_ID);
        }
        return await Report.findOne({
            where: {
                id: id,
                del: 0
            }
        })
    }

    async createReport(data) {

        if (!data.type_report) {
            console.log('MidReport-createReport: ErrorCode-32');
            throw new Error(ERROR_MESSAGE.REPORT.REPORT_TYPE_NOT_EXIST);
        }
        if (!data.content) {
            console.log('MidReport-createReport: ErrorCode-36');
            throw new Error(ERROR_MESSAGE.REPORT.REPORT_CONTENT_NOT_EXIST)
        }
        if (!data.user_id) {
            console.log('MidReport-createReport: ErrorCode-40');
            throw new Error(ERROR_MESSAGE.REPORT.REPORT_USER_ID)
        }
        if (!data.shop_id) {
            console.log('MidReport-createReport: ErrorCode-44');
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
        let object = await Report.create(dataCreate);
        if(!object){
            console.log('MidReport-createReport: ErrorCode-70');
        }console.log('MidReport-createReport: Success');
        return object
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
        for (let i = 0; i < listReport.length; i++) {
            let user = await MidUser.getUserById(listReport[i].dataValues.user_id)
            let shop = await MidUser.getUserById(listReport[i].dataValues.shop_id)
      
            if (name && shop) {
                let temp = {
                    user : user.name,
                    shop : shop.name,

                }
                Object.assign(listReport[i].dataValues, temp);
            }
        }
        if(!listReport){
            console.log('MidReport-searchReport: ErrorCode-93');
        }   console.log('MidReport-searchReport: Success');
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
        if(!listReport){
            console.log('MidReport-searchReportbyShop: ErrorCode-44');
        }console.log('MidReport-searchReportbyShop: Success');
        return {
            listReport,
            total: total || 0
        }
    }

}

export default new MidReport()