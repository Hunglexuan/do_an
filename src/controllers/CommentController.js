import { MidRole, MidUser, MidUserForm } from '../models/middle';
import { uploadMultiMedia } from '../libs/upload';
import { MidComment, MidRoleForm } from '../models/middle';

class BillController {

    async createComment(req, res) {
        let data = req.body;
        return MidComment.createComment(data);
    }
    async searchComment(req, res) {
        let dataQuery = req.query;
        return MidComment.searchComment(dataQuery);
    }
    async notifyUser(req, res) {
        let dataQuery = req.query;
        return MidComment.notifyCommentUser(dataQuery);
    }
    async notifySeller(req, res) {
        let dataQuery = req.query;
        return MidComment.notifyCommentSeller(dataQuery);
    }
    async deleteComment(req, res) {
        let dataQuery = req.query;
        return await MidComment.deleteComment(dataQuery);
    }
    async updateComment(req, res) {
        let data = req.body;
        return MidComment.updateComment(data);
    }
}

export default new BillController();