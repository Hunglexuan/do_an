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
    // async searchBill(req, res) {
    //     let dataQuery = req.query;
    //     return MidBill.searchBillUser(dataQuery);
    // }
    async listCart(req, res) {
        let dataQuery = req.query;
        return MidBill.listCart(dataQuery);
    } 
    async cancelBill(req, res) {
        let dataQuery = req.query;
        return await MidBill.cancelBill(dataQuery);
    }
}

export default new BillController();