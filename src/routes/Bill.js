import { Router } from 'express';
import { BillController } from '../controllers';
import { Response } from '../libs/handle_response';
import { isAuth } from '../middlewares/auth';

let routerApp = new Router();


routerApp.post('/create', Response(BillController.createBill));
routerApp.get('/searchbill', Response(BillController.searchBill));
routerApp.get('/listCart', Response(BillController.listCart));


export default routerApp;