import { Router } from 'express';
import { BillController } from '../controllers';
import { Response } from '../libs/handle_response';
import { isAuth } from '../middlewares/auth';

let routerApp = new Router();


routerApp.post('/create', Response(BillController.createBill));
routerApp.post('/searchbill', Response(BillController.searchBill));


export default routerApp;