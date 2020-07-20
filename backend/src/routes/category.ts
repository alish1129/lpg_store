import { Router } from 'express';
import { create } from '../controllers/category';
import { isAdmin, isAuth, requireSignIn } from '../controllers/auth';
import { userById } from '../controllers/user';

const categoryRouter = Router();

// @route    Get api/category
// @desc     Category route
// @access   Admin
categoryRouter.post('/category/create/:userId', requireSignIn, isAdmin, create);

categoryRouter.param('userId', userById);

export { categoryRouter };
