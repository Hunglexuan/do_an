import { MidRole, MidUser, MidUserForm } from '../models/middle';
import { uploadMultiMedia } from '../libs/upload';
import {MidImage,MidRoleForm} from '../models/middle';

class BillController {

async createImage(req,res){
    let data = req.body;
    return MidImage.createImage(data);
}
async searchImage(req, res) {
    let dataQuery = req.query;
    return MidImage.searchImage(dataQuery);
}
}

export default new BillController();