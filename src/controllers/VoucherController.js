import { MidRole, MidUser, MidUserForm } from '../models/middle';
import { uploadMultiMedia } from '../libs/upload';
import { MidVoucher, MidRoleForm } from '../models/middle';

class VoucherController {

    async createVoucher(req, res) {
        let data = req.body;
        return MidVoucher.createVoucher(data);
    }
    async searchVoucher(req, res) {
        let dataQuery = req.query;
        return MidVoucher.searchVoucher(dataQuery);
    }
    async deleteVourcher(req, res) {
        let dataQuery = req.query;
        return await MidVoucher.deleteVoucher(dataQuery);
    }
}

export default new VoucherController();