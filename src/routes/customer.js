import { Router } from 'express';
import { CustomerController } from '../controllers';
import { Response } from '../libs/handle_response';
import { isAuth } from '../middlewares/auth';

let routerApp = new Router();

routerApp.get('/getbyId', isAuth, Response(CustomerController.getCustomerById));
routerApp.get('/search', Response(CustomerController.searchCustomer));
routerApp.post('/create', Response(CustomerController.createCustomer));
routerApp.get('/delete', isAuth, Response(CustomerController.deleteCustomer));
routerApp.get('/seen', isAuth, Response(CustomerController.seen));


export default routerApp;