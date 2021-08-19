import { Router } from 'express';
import { ProductController } from '../controllers';
import { Response } from '../libs/handle_response';
import { isAuth } from '../middlewares/auth';

let routerApp = new Router();

routerApp.post('/image', Response(ProductController.imageUpdate));

routerApp.get('/getById', Response(ProductController.getProductById)); 
routerApp.post('/create', Response(ProductController.createProduct));
routerApp.get('/searchSellerproduct', Response(ProductController.searchSellerProduct));
routerApp.get('/searchAllProduct', Response(ProductController.searchAllProduct));
routerApp.get('/list6MostBuy', Response(ProductController.search6slot));
routerApp.get('/listDefault', Response(ProductController.searchDefault));
routerApp.get('/listSale', Response(ProductController.listSale));
routerApp.get('/listFastDeli', Response(ProductController.listFastDelivery));
routerApp.get('/delete',  Response(ProductController.deleteProduct));
routerApp.post('/update',  Response(ProductController.updateProduct));

export default routerApp;