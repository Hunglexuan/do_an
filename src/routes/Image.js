import { Router } from 'express';
import { ImageController } from '../controllers';
import { Response } from '../libs/handle_response';
import { isAuth } from '../middlewares/auth';

let routerApp = new Router();


routerApp.post('/create', Response(ImageController.createImage));
routerApp.post('/createimage', Response(ImageController.createImage));

export default routerApp;