import { Router } from 'express';
import { ProductController } from '../controllers';
import { Response } from '../libs/handle_response';
import { isAuth } from '../middlewares/auth';

let routerApp = new Router();


routerApp.post('/create', Response(ProductController.createProduct));
routerApp.get('/searchproduct',isAuth, Response(ProductController.searchProduct));
routerApp.get('/searchproductforseller',isAuth, Response(ProductController.searchProductforSeller));

export default routerApp;