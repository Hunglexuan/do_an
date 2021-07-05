import { MidRole, MidUser, MidUserForm } from '../models/middle';
import { uploadMultiMedia } from '../libs/upload';
import {MidComment,MidRoleForm} from '../models/middle';

class BillController {

async createComment(req,res){
    let data = req.body;
    return MidComment.createComment(data);
}
async searchComment(req, res) {
    let dataQuery = req.query;
    return MidComment.searchComment(dataQuery);
}
}

export default new BillController();