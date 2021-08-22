import { Router } from 'express';
import { CommentController } from '../controllers';
import { Response } from '../libs/handle_response';
import { isAuth } from '../middlewares/auth';

let routerApp = new Router();


routerApp.post('/create', Response(CommentController.createComment));
routerApp.get('/delete', Response(CommentController.deleteComment));
routerApp.post('/update', Response(CommentController.updateComment));
routerApp.get('/searchcomment', Response(CommentController.searchComment));
routerApp.get('/notify', Response(CommentController.notifyUser));

export default routerApp;