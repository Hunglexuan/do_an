import { MidUser, MidUserForm } from '../models/middle';
import { uploadMedia, uploadMultiMedia } from '../libs/upload';

class UserController {


    async getUserId(req, res) {
        let { id } = req.query;
        return await MidUser.getUserById(id);
    }

    async searchUser(req, res) {
        let dataQuery = req.query;
        return MidUser.searchUser(dataQuery);
    }
    async searchSeller(req, res) {
        let dataQuery = req.query;
        return MidUser.searchSeller(dataQuery);
    }

    async createUser(req, res) {
        let data = req.body;
        return MidUser.createUser(data);
    }
    async updateUser(req, res) {
        let data = req.body;
        return MidUser.updateUser(data);
    }
    async updateSeller(req, res) {
        let data = req.body;
        return MidUser.updateSeller(data);
    }

    async changePassword(req, res) {
        let data = req.body;
        return MidUser.updatePassword(data);
    }
    async deleteUser(req, res) {
        let dataQuery = req.query;
        return await MidUser.deleteUser(dataQuery);
    }
    async enableUser(req, res) {
        let dataQuery = req.query;
        return await MidUser.enableUser(dataQuery);
    }
    async upgradeRole(req, res) {
        let dataQuery = req.query;
        return await MidUser.upgradeRole(dataQuery);
    }

    async downgradeRole(req, res) {
        let dataQuery = req.query;
        return await MidUser.downgradeRole(dataQuery);
    }
    async avatarUpdate(req, res) {
       
        const dataUpload = await uploadMedia(req, res);
        

        let logo = dataUpload ? dataUpload.filename : '';
        let data = req.body;
        return await MidUser.updateAvatar(data, logo);
    }
    async updateStatus(req, res) {
        let dataQuery = req.query;
        return await MidUser.updateShopStatus(dataQuery);
    }
    async changePass(req, res) {
        let data = req.body;
        return MidUser.changePass(data);
    }
}

export default new UserController();