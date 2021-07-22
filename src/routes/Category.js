import { Router } from 'express';
import { CategoryController } from '../controllers';
import { Response } from '../libs/handle_response';
import { isAuth } from '../middlewares/auth';

let routerApp = new Router();


routerApp.post('/create', Response(CategoryController.createCategory));
routerApp.get('/searchcategory', Response(CategoryController.searchCategory));

export default routerApp;