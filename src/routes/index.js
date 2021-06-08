import { Router } from 'express';
import auth from './auth';

import user from './user';
import customer from './customer';



let routerApp = new Router();
routerApp.use('/auth', auth);

routerApp.use('/user', user);
routerApp.use('/customer', customer);




export default routerApp;