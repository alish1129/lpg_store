import { Router } from 'express';
import { requireSignIn, isAuth, isAdmin } from '../controllers/auth';
import { userById } from '../controllers/user';

const userRouter = Router();

userRouter.get('/secret/:userId', requireSignIn, isAuth, isAdmin, (req: any, res: any) => {
	console.log(req);

	res.json({
		user: req.profile
	});
});

userRouter.param('userId', userById);

export { userRouter };
