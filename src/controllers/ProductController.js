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
async searchProductforSeller(req, res) {
    let dataQuery = req.query;
    let { token } = req.headers;
    if (!token) {
        token = req.query.token;
    }
    console.log("2222222222",token);
    return MidProduct.searchProductforSeller(dataQuery,token);
}
}

export default new ProductController();