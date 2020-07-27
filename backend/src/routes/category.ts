import { Router } from 'express';
import CategoryController from '../controllers/category';
import { isAdmin, isAuth, requireSignIn } from '../controllers/auth';
import UserController from '../controllers/user';

const categoryRouter = Router();
const categoryController = new CategoryController();
const userController = new UserController();

// @route    Get api/category
// @desc     Category route
// @access   Admin
categoryRouter.post('/category/create/:userId', requireSignIn, isAdmin, categoryController.create);
categoryRouter.get('/category/:categoryId', requireSignIn, isAdmin, categoryController.read);
categoryRouter.delete('/category/:categoryId', requireSignIn, isAdmin, categoryController.deleteCategory);
categoryRouter.put('/category/update/:categoryId', requireSignIn, isAdmin, categoryController.updateCategory);
categoryRouter.get('/categories', categoryController.listAllCategories);

categoryRouter.param('userId', userController.userById);
categoryRouter.param('categoryId', categoryController.getCategoryById);

export { categoryRouter };
