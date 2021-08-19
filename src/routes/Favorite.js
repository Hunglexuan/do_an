import { Router } from 'express';
import { FavoriteController } from '../controllers';
import { Response } from '../libs/handle_response';
import { isAuth } from '../middlewares/auth';

let routerApp = new Router();


routerApp.post('/create', Response(FavoriteController.createFavorite));
routerApp.get('/delete', Response(FavoriteController.deleteFavorite));

export default routerApp;