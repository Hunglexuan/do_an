import { Router } from 'express';
import { BillController } from '../controllers';
import { Response } from '../libs/handle_response';
import { isAuth } from '../middlewares/auth';

let routerApp = new Router();


routerApp.post('/create', Response(BillController.createBill));
routerApp.post('/update', Response(BillController.update));
routerApp.get('/listOrderForSeller', Response(BillController.listOrderForSeller));
routerApp.get('/listOrderForUser', Response(BillController.listOrderForUser));
routerApp.get('/listSuccessForSeller', Response(BillController.listSuccessForSeller));
routerApp.get('/listCancelForSeller', Response(BillController.listCancelForSeller));
routerApp.get('/listCart', Response(BillController.listCart));
routerApp.get('/cancel', Response(BillController.cancelBill));  // dùng cho cả 2 -- nút cancel
routerApp.post('/accept', Response(BillController.acceptBill));   // dùng cho seller -- nút accept
routerApp.get('/complete', Response(BillController.completeBill));  // dùng cho user -- nút complete



export default routerApp;