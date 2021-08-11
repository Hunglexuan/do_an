import { MidRole, MidUser, MidUserForm } from '../models/middle';
import { uploadMultiMedia } from '../libs/upload';
import { MidFeedback, MidRoleForm } from '../models/middle';

class FeedbackController {

    async createFeedback(req, res) {
        let data = req.body;
        return MidFeedback.createFeedback(data);
    }
    async searchFeedback(req, res) {
        let dataQuery = req.query;
        return MidFeedback.searchFeedbackByShopId(dataQuery);
    }
    async checkPermissionFeed(req, res) {
        let dataQuery = req.query;
        return MidFeedback.checkPermissionFeedBack(dataQuery);
    }
}

export default new FeedbackController();