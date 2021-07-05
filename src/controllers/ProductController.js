import { MidRole, MidUser, MidUserForm } from '../models/middle';
import { uploadMultiMedia } from '../libs/upload';
import {MidProduct,MidRoleForm} from '../models/middle';

class ProductController {

async createProduct(req,res){
    let data = req.body;
    return MidProduct.createProduct(data);
}
async searchProduct(req, res) {
    let dataQuery = req.query;
    return MidProduct.searchProduct(dataQuery);
}
}

export default new ProductController();