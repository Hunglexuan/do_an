import { MidRole, MidUser, MidUserForm } from '../models/middle';
import { uploadMultiMedia } from '../libs/upload';
import {MidRole,MidRoleForm} from '../models/middle';

class RoleController {

async creatRole(req,res){
    let data = req.body;
    return MidRole.creatRole(data);
}
async deleteRole(req, res) {
    let dataQuery = req.query;
    return await MidRole.deleteRole(dataQuery);
}
async updateRole(req,res){
    let data = req.body;
    return MidRole.updateRole(data);
}

}

export default new RoleController();