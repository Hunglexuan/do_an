import { Router } from 'express';
import { AuthController } from '../controllers';
import { Response } from '../libs/handle_response';
import { isAuth } from '../middlewares/auth';

let routerApp = new Router();
routerApp.post('/login', Response(AuthController.login));
routerApp.post('/forgotPassword', Response(AuthController.forgotPassword));
routerApp.post('/confirmForgotPassword', Response(AuthController.verifyForgot));
routerApp.get('/getInfo', isAuth, Response(AuthController.getUserInfo));

export default routerApp;