import { MidRole, MidUser, MidUserForm } from '../models/middle';
import { uploadMultiMedia } from '../libs/upload';
import {MidComment,MidRoleForm} from '../models/middle';

class BillController {

async createComment(req,res){
    let data = req.body;
    return MidComment.createComment(data);
}

}

export default new BillController();