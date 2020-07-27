import { Router } from 'express';
import { requireSignIn, isAuth, isAdmin } from '../controllers/auth';
import UserController from '../controllers/user';

const userRouter = Router();
const userController = new UserController();

userRouter.get('/user/:userId', requireSignIn, isAdmin, (req: any, res: any) => {
	console.log(req);

	res.json({
		user: req.profile
	});
});

userRouter.put('/user/update/:userId', requireSignIn, isAdmin, userController.updateUserProfile);
userRouter.get('/users', requireSignIn, isAdmin, userController.getAllUsers);
userRouter.get('/adminUsers', requireSignIn, isAdmin, userController.getAllAdminUsers);

userRouter.param('userId', userController.userById);

export { userRouter };
