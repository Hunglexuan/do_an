import { Router } from 'express';
import { FeedbackController } from '../controllers';
import { Response } from '../libs/handle_response';
import { isAuth } from '../middlewares/auth';

let routerApp = new Router();


routerApp.post('/create', Response(FeedbackController.createFeedback));
routerApp.post('/searchfeedback', Response(FeedbackController.searchFeedback));

export default routerApp;