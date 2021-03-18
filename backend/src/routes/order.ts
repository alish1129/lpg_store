import { Router } from 'express';
// import { create, productById, getProduct, removeProduct, updateProduct } from '../controllers/product';
import { isAdmin, requireSignIn, isAuth } from '../controllers/auth';
import UserController from '../controllers/user';
import ProductController from '../controllers/product';
import CategoryController from '../controllers/category';

const productRouter = Router();
const productController = new ProductController();
const userController = new UserController();
const categoryController = new CategoryController();

// @route    Get api/category
// @desc     Category route
// @access   Admin
productRouter.post('/product/create/:userId', requireSignIn, isAdmin, productController.create);
productRouter.get('/product/:productId', requireSignIn, productController.getProduct);
productRouter.delete('/product/:productId', requireSignIn, isAdmin, productController.removeProduct);
productRouter.put('/product/:productId', requireSignIn, isAdmin, productController.updateProduct);
productRouter.get('/products/:categoryId', productController.getAllProductsByCategory);
productRouter.get('/products/', productController.list);
productRouter.get('/products/related/:productId', productController.relatedList);
productRouter.post('/products/by/search', productController.listBySearch);
productRouter.post('/products/search', productController.listSearch);
productRouter.get('/product/images/:productId', productController.getImages);

productRouter.param('userId', userController.userById);
productRouter.param('productId', productController.productById);
productRouter.param('categoryId', categoryController.getCategoryById);

export { productRouter };
