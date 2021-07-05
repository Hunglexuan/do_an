import { Router } from 'express';
import { BillTemptController } from '../controllers';
import { Response } from '../libs/handle_response';
import { isAuth } from '../middlewares/auth';

let routerApp = new Router();


routerApp.post('/create', Response(BillTemptController.createBillTemp));


export default routerApp;