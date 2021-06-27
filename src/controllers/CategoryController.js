import { MidRole, MidUser, MidUserForm } from '../models/middle';
import { uploadMultiMedia } from '../libs/upload';
import {MidCategory,MidRoleForm} from '../models/middle';

class CategoryController {

async createCategory(req,res){
    let data = req.body;
    return MidCategory.createCategory(data);
}

}

export default new CategoryController();