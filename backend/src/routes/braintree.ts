import { Router } from 'express';
import { isAuth, requireSignIn } from '../controllers/auth';
import BrainTreeController from '../controllers/braintree';
import UserController from '../controllers/user';

const brainTreeRouter = Router();
const userController = new UserController();
const brainTreeController = new BrainTreeController();

brainTreeRouter.get('/braintree/getToken/:userId', requireSignIn, isAuth, brainTreeController.generateToken);

brainTreeRouter.param('userId', userController.userById);

export {brainTreeRouter};