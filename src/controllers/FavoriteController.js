import { MidRole, MidUser, MidUserForm } from '../models/middle';
import { uploadMultiMedia } from '../libs/upload';
import { MidFavorite, MidRoleForm } from '../models/middle';

class FavoriteController {

    async createFavorite(req, res) {
        let data = req.body;
        return MidFavorite.createFavor(data);
    }
    async deleteFavorite(req, res) {
        let dataQuery = req.query;
        return await MidFavorite.deleteFavor(dataQuery);
    }
}

export default new FavoriteController();