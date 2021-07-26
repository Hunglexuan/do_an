import { MidUser, MidUserForm } from '../models/middle';
import { uploadMultiMedia } from '../libs/upload';
import { MidReport, MidReportForm } from '../models/middle';

class ReportController {

    async searchReport(req, res) {
        let dataQuery = req.query;
        return MidReport.searchReport(dataQuery);
    }
    async createReport(req, res) {
        let data = req.body;
        return MidReport.createReport(data);
    }

    async getReportById(req, res) {
        let { id } = req.query;
        return await MidReport.getReportById(id);
    }
    async deleteReportById(req, res) {
        let { id } = req.query;
        return await MidReport.deleteReportById(id);
    }
}

export default new ReportController();