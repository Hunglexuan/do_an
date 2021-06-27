import { MidRole, MidUser, MidUserForm } from '../models/middle';
import { uploadMultiMedia } from '../libs/upload';
import {MidBillTemp,MidRoleForm} from '../models/middle';

class BillTempController {

async createBillTemp(req,res){
    let data = req.body;
    return MidBillTemp.createBillTemp(data);
}

}

export default new BillTempController();