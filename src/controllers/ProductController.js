import { MidRole, MidUser, MidUserForm } from '../models/middle';
import { uploadMultiMedia } from '../libs/upload';
import { MidProduct, MidRoleForm } from '../models/middle';

class ProductController {

    
    async getProductById(req, res) {
        let { id } = req.query;
        return await MidProduct.getProductById(id);
    }

    async createProduct(req, res) {
        let data = req.body;
        return MidProduct.createProduct(data);
    }
    async searchSellerProduct(req, res) {
        let dataQuery = req.query;
        return MidProduct.searchSellerProduct(dataQuery);
    }

    async searchAllProduct(req, res) {
        let dataQuery = req.query;
        return MidProduct.searchAllProduct(dataQuery);
    }
    async updateProduct(req, res) {
        let dataQuery = req.query;
        return await MidProduct.updateProduct(dataQuery);
    }
    async deleteProduct(req, res) {
        let dataQuery = req.query;
        return await MidProduct.deleteProduct(dataQuery);
    }
}

export default new ProductController();