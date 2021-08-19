import { Router } from 'express';
import { BillController } from '../controllers';
import { Response } from '../libs/handle_response';
import { isAuth } from '../middlewares/auth';

let routerApp = new Router();


routerApp.post('/create', Response(BillController.createBill));
routerApp.post('/update', Response(BillController.update));
// routerApp.get('/searchbill', Response(BillController.searchBill));
routerApp.get('/listCart', Response(BillController.listCart));
routerApp.get('/cancel', Response(BillController.cancelBill));



export default routerApp;