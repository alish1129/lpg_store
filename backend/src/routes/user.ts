import { Router } from 'express';
import { requireSignIn, isAdmin } from '../controllers/auth';
import { userById } from '../controllers/user';

const userRouter = Router();

userRouter.get('/secret/:userId', requireSignIn, isAdmin, (req: any, res: any) => {
	res.json({
		user: req.profile
	});
});

userRouter.param('userId', userById);

export default userRouter;
