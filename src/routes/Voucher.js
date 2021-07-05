import { Router } from 'express';
import { VoucherController } from '../controllers';
import { Response } from '../libs/handle_response';
import { isAuth } from '../middlewares/auth';

let routerApp = new Router();


routerApp.post('/create', Response(VoucherController.createVoucher));


export default routerApp;