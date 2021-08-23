import { MidRole, MidUser, MidUserForm } from '../models/middle';
import { uploadMultiMedia } from '../libs/upload';
import { MidBill, MidRoleForm } from '../models/middle';

class BillController {

    async createBill(req, res) {
        
        let data = req.body;
        return MidBill.createBill(data);
    }
    async update (req, res) {
        
        let data = req.body;
        return MidBill.updateBill(data);
    }
    async listOrderForSeller(req, res) {
        let dataQuery = req.query;
        return MidBill.listOrderForSeller(dataQuery);
    }
    async listOrderForUser(req, res) {
        let dataQuery = req.query;
        return MidBill.listOrderForUser(dataQuery);
    }
    async listSuccessForSeller(req, res) {
        let dataQuery = req.query;
        return MidBill.listSuccessForSeller(dataQuery);
    }
    async listCancelForSeller(req, res) {
        let dataQuery = req.query;
        return MidBill.listCancelForSeller(dataQuery);
    }
    async listCart(req, res) {
        let dataQuery = req.query;
        return MidBill.listCart(dataQuery);
    } 
    async cancelBill(req, res) {
        let dataQuery = req.query;
        return await MidBill.cancelBill(dataQuery);
    }
    async acceptBill(req, res) {
        let dataQuery = req.body;
        return await MidBill.acceptBill(dataQuery);
    }
    async completeBill(req, res) {
        let dataQuery = req.query;
        return await MidBill.completeBill(dataQuery);
    }
}

export default new BillController();