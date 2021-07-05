import { MidRole, MidUser, MidUserForm } from '../models/middle';
import { uploadMultiMedia } from '../libs/upload';
import {MidCategory,MidRoleForm} from '../models/middle';

class CategoryController {

async createCategory(req,res){
    let data = req.body;
    return MidCategory.createCategory(data);
}
async searchCategory(req, res) {
    let dataQuery = req.query;
    return MidCategory.searchCategory(dataQuery);
}
}

export default new CategoryController();