import { Router } from 'express';
import { UserController } from '../controllers';
import { Response } from '../libs/handle_response';
import { isAuth } from '../middlewares/auth';

let routerApp = new Router();



routerApp.get('/getbyId', Response(UserController.getUserId)); 
routerApp.get('/searchUser', isAuth, Response(UserController.searchUser));
routerApp.get('/searchSeller', Response(UserController.searchSeller));
routerApp.get('/delete', isAuth, Response(UserController.deleteUser));
routerApp.get('/upRole', isAuth, Response(UserController.upgradeRole));
routerApp.get('/downRole', isAuth, Response(UserController.downgradeRole));

routerApp.post('/create', Response(UserController.createUser));
routerApp.post('/updateUser', isAuth, Response(UserController.updateUser));
routerApp.post('/updateSeller', isAuth, Response(UserController.updateSeller));

export default routerApp;