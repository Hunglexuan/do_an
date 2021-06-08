import { MidUser, MidUserForm } from '../models/middle';
import { uploadMultiMedia } from '../libs/upload';

class UserController {
    async getUserInfo(req, res) {
        let { userData } = req;
        userData = userData.toJSON();
        if (!userData.distributor_id) {
            userData.distributor = "";
        } else {
            const distributorData = await MidDistributor.getDistributorById(userData.distributor_id);
            userData.distributor = distributorData || "";
        }

        return userData;
    }

    async getUserId(req, res) {
        let { id } = req.query;
        return await MidUser.getUserById(id);
    }

    async getUserIdNoPass(req, res) {
        let { id } = req.query;
        return await MidUser.getUserByIdNoPass(id);
    }
    async searchUser(req, res) {
        let dataQuery = req.query;
        return MidUser.searchUser(dataQuery);
    }

    async createUser(req, res) {
        let data = req.body;
        return MidUser.createUser(data);
    }
    async updateUser(req, res) {
        let data = req.body;
        return MidUser.updateUser(data);
    }
   
    async changePassword(req, res) {
        let data = req.body;
        return MidUser.updatePassword(data);
    }
    async deleteUser(req, res) {
        let dataQuery = req.query;
        return await MidUser.deleteUser(dataQuery);
    }



}

export default new UserController();