import { MidRole, MidUser, MidUserForm } from '../models/middle';
import { uploadMultiMedia } from '../libs/upload';
import {MidFeedback,MidRoleForm} from '../models/middle';

class FeedbackController {

async createFeedback(req,res){
    let data = req.body;
    return MidFeedback.createFeedback(data);
}

}

export default new FeedbackController();