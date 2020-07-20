import { Router } from 'express';
import { create, productById, getProduct, removeProduct } from '../controllers/product';
import { isAdmin, requireSignIn, isAuth } from '../controllers/auth';
import { userById } from '../controllers/user';

const productRouter = Router();

// @route    Get api/category
// @desc     Category route
// @access   Admin
productRouter.post('/product/create/:userId', requireSignIn, isAdmin, create);
productRouter.get('/product/:productId', requireSignIn, getProduct);
productRouter.delete('/product/:productId', requireSignIn, isAdmin, removeProduct);

productRouter.param('userId', userById);
productRouter.param('productId', productById);

export { productRouter };
