import { MidRole, MidUser, MidUserForm } from '../models/middle';
import { uploadMultiMedia } from '../libs/upload';
import {MidBill,MidRoleForm} from '../models/middle';

class BillController {

async createBill(req,res){
    console.log(req.body);
    let data = req.body;
    return MidBill.createBill(data);
}
async searchBill(req, res) {
    let dataQuery = req.query;
    return MidBill.searchBillUser(dataQuery);
}

}

export default new BillController();