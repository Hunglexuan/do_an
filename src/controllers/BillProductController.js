import { MidRole, MidUser, MidUserForm } from '../models/middle';
import { uploadMultiMedia } from '../libs/upload';
import {MidBillProduct,MidRoleForm} from '../models/middle';

class BillProductController {

async createBillProduct(req,res){
    let data = req.body;
    return MidBillProduct.createBillProduct(data);
}
async searchBillProduct(req, res) {
    let dataQuery = req.query;
    return MidBillProduct.searchBillProduct(dataQuery);
}

}

export default new BillProductController();