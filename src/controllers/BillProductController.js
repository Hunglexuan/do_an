import { MidRole, MidUser, MidUserForm } from '../models/middle';
import { uploadMultiMedia } from '../libs/upload';
import {MidBillProduct,MidRoleForm} from '../models/middle';

class BillController {

async createBillProduct(req,res){
    let data = req.body;
    return MidBillProduct.createBillProduct(data);
}

}

export default new BillController();