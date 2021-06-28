import { Router } from 'express';
import auth from './auth';

import user from './user';
import customer from './customer';
import Role from './Role';
import Bill from './Bill';
import Report from './Report';
import Category from './Category';
import Comment from './Comment';
import Feedback from './Feedback';
import Voucher from './Voucher';
import BillProduct from './BillProduct';
import Product from './Product';
import BillTemp from './BillTemp';
import Image from './Image';




let routerApp = new Router();
routerApp.use('/auth', auth);

routerApp.use('/user', user);
routerApp.use('/customer', customer);
routerApp.use('/role', Role);
routerApp.use('/report', Report);
routerApp.use('/bill', Bill);
routerApp.use('/category', Category);
routerApp.use('/comment', Comment);
routerApp.use('/feedback', Feedback);
routerApp.use('/voucher', Voucher);
routerApp.use('/billproduct', BillProduct);
routerApp.use('/product', Product);
routerApp.use('/billTemp', BillTemp);
routerApp.use('/image', Image);






export default routerApp;