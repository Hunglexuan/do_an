import { MidRole, MidUser, MidUserForm } from '../models/middle';
import { uploadMultiMedia } from '../libs/upload';
import {MidVoucher,MidRoleForm} from '../models/middle';

class VoucherController {

async createVoucher(req,res){
    let data = req.body;
    return MidVoucher.createVoucher(data);
}

}

export default new VoucherController();