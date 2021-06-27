import { MidRole, MidUser, MidUserForm } from '../models/middle';
import { uploadMultiMedia } from '../libs/upload';
import {MidBill,MidRoleForm} from '../models/middle';

class BillController {

async createBill(req,res){
    let data = req.body;
    return MidBill.createBill(data);
}

}

export default new BillController();