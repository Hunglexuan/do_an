import { Router } from 'express';
import { ReportController } from '../controllers';
import { Response } from '../libs/handle_response';
import { isAuth } from '../middlewares/auth';

let routerApp = new Router();


routerApp.post('/create', Response(ReportController.createReport));
routerApp.post('/searchreport', Response(ReportController.searchReport));

export default routerApp;