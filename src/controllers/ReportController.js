import { MidUser, MidUserForm } from '../models/middle';
import { uploadMultiMedia } from '../libs/upload';
import {MidReport,MidReportForm} from '../models/middle';

class ReportController {
async getReportByUserId(req,res){
    let id = req.query;
    return await MidReport.getReportByUserId(id);
}
async getAllReportByUserId(req,res){
    let id = req.query;
    return await MidReport.getAllReportByUserId(id);
} 
async getReportId(req,res){
    let{id} = req.query;
    return await MidReport.getReportId(id);
}
async searchReport(req,res){
    let dataQuery = req.query;
    return MidReport.searchReport(dataQuery);
}
async createReport(req,res){
    let data = req.body;
    return MidReport.createReport(data);
}
async deleteReport(req, res) {
    let dataQuery = req.query;
    return await MidReport.deleteReport(dataQuery);
}

}

export default new ReportController();