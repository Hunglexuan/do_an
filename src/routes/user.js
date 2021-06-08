import { Router } from 'express';
import { UserController } from '../controllers';
import { Response } from '../libs/handle_response';
import { isAuth } from '../middlewares/auth';

let routerApp = new Router();

routerApp.get('/getbyId', isAuth, Response(UserController.getUserId));
routerApp.get('/getbyIdNoPass', isAuth, Response(UserController.getUserIdNoPass));
routerApp.get('/search', Response(UserController.searchUser));
routerApp.get('/delete', isAuth, Response(UserController.deleteUser));
routerApp.post('/create', Response(UserController.createUser));
routerApp.post('/update', Response(UserController.updateUser));
routerApp.post('/changePass', Response(UserController.changePassword));


export default routerApp;