
import { uploadMultiMedia } from '../libs/upload';
import {MidRole,MidRoleForm} from '../models/middle'

class RoleController {

async createRole(req,res){
    let data = req.body;
    return MidRole.createRole(data);
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