import {
    Users,Report
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
    async searchReport(data) {
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

        const [listReport, total] = await Promise.all([
            Report.findAll({
                where: condition,
                order: [[
                    data.typeOrder === 'name' ? 'name' : 'createdAt',
                    data.stateOrder === 'up' ? 'ASC' : 'DESC'
                ]],
                limit,
                offset: (page - 1) * limit
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
    async getReportByUserId(userid) {
        return await Users.findOne({
            where: {
                id: userid,
                del: 0
            }
        })
    }
    async getAllReportByUserId(userid){
        return await Users.findAll({
            where: {
                id:userid,
                del:0
            }
        })
    }
    async createReport(data){
        if (!data.type_report) {
            throw new Error(ERROR_MESSAGE.REPORT.REPORT_TYPE_NOT_EXIST);
        }
        if(!data.content){
            throw new Error(ERROR_MESSAGE.REPORT.REPORT_CONTENT_NOT_EXIST)
        }
        if(!data.user_id){
            throw new Error(ERROR_MESSAGE.REPORT.REPORT_USER_ID)
        }
        if(!data.shop_id){
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
        if(!user || !shop){
            throw new Error(ERROR_MESSAGE.REPORT.REPORT_SHOP_ID_or_USER_ID)
        }
        let dataCreate = {
            type_report: data.type_report,
            content:data.content,
            user_id:data.user_id,
            shop_id:data.shop_id,
            del: 0
        }

        return await Report.create(dataCreate);
    }
    async deleteRole(data) {
        let objDelete = await Report.findOne({
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
    async updateReport(data) {
        if (!data.id) {
            throw new Error(ERROR_MESSAGE.REPORT.REPORT_EXIST);
        }
        if(!data.type_report){
            throw new Error(ERROR_MESSAGE.REPORT.REPORT_TYPE_NOT_EXIST)
        }
        

        let objUpdate = await Report.findOne({
            where: {
                id: data.id,
                del: 0
            }
        })
    
        let dataUpdate = {
            type_report: data.type_report,
            content: data.content
            
        }
        return await objUpdate.update(dataUpdate)
    
    }
    async searchReport(data) {
        let condition = {
            del: 0
        }
        if (data.type_report) {
            condition.type_report = {
                [Op.like]: `%${data.type_report}%`
            }
        }
        if (data.content) {
            condition.content = {
                [Op.like]: `%${data.content}%`
            }
        }
        let { page, limit } = data;
        page = page ? parseInt(page) : 1;
        limit = limit ? parseInt(limit) : 10;

        const [listReport, total] = await Promise.all([
            Report.findAll({
                where: condition,
                order: [[
                    ["createdAt", "ASC"],
                ]],
                limit,
                offset: (page - 1) * limit
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