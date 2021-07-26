import { Router } from 'express';
import { ReportController } from '../controllers';
import { Response } from '../libs/handle_response';
import { isAuth } from '../middlewares/auth';

let routerApp = new Router();


routerApp.post('/create', Response(ReportController.createReport));
routerApp.get('/search', Response(ReportController.searchReport));
routerApp.get('/getById', Response(ReportController.getReportById));
routerApp.get('/deleteReportById', Response(ReportController.deleteReportById));

export default routerApp;