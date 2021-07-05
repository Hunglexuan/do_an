import { MidUser } from '../models/middle';
import { Console } from 'winston/lib/winston/transports';

class AuthController {
    login(req, res) {

        return MidUser.loginUser(req.body);
    }

    loginAdmin(req, res) {

        return MidUser.loginAdmin(req.body);
    }
    loginSeller(req, res) {

        return MidUser.loginSeller(req.body);
    }

    forgotPassword(req, res) {
        return MidUser.forgotPassword(req.body);
    }

    verifyForgot(req, res) {
        const { email, strConfirm, newPassword } = req.body;
        return MidUser.VerifyForgotPassword(email, strConfirm, newPassword)
    }

    async getUserInfo(req, res) {
        let { userData } = req;
        userData = userData.toJSON();

        return userData;
    }
}

export default new AuthController();