import { Router } from 'express';
import { ProductController } from '../controllers';
import { Response } from '../libs/handle_response';
import { isAuth } from '../middlewares/auth';

let routerApp = new Router();

routerApp.get('/getById', Response(ProductController.getProductById)); 

routerApp.post('/create', Response(ProductController.createProduct));
routerApp.get('/searchSellerproduct', Response(ProductController.searchSellerProduct));
routerApp.get('/searchAllProduct', Response(ProductController.searchAllProduct));
routerApp.get('/delete',  Response(ProductController.deleteProduct));
routerApp.post('/update',  Response(ProductController.updateProduct));

export default routerApp;