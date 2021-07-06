import { Router } from 'express';
import { BillProductController } from '../controllers';
import { Response } from '../libs/handle_response';
import { isAuth } from '../middlewares/auth';

let routerApp = new Router();


routerApp.post('/create', Response(BillProductController.createBillProduct));
routerApp.post('/searchbillbroduct', Response(BillProductController.searchBillProduct));


export default routerApp;