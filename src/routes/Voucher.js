import { Router } from 'express';
import { VoucherController } from '../controllers';
import { Response } from '../libs/handle_response';
import { isAuth } from '../middlewares/auth';

let routerApp = new Router();


routerApp.post('/create', Response(VoucherController.createVoucher));
routerApp.get('/search', Response(VoucherController.searchVoucher));
routerApp.get('/delete', Response(VoucherController.deleteVourcher));
routerApp.get('/getCode', Response(VoucherController.getByID));
routerApp.post('/update', Response(VoucherController.updateVoucher));

export default routerApp;