import { Router } from 'express';
import { RoleController } from '../controllers';
import { Response } from '../libs/handle_response';
import { isAuth } from '../middlewares/auth';

let routerApp = new Router();


routerApp.post('/create', Response(RoleController.createRole));
routerApp.post('/createrole', Response(RoleController.searchRole));

export default routerApp;