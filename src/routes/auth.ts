import { Router } from 'express';
import { signup, signin, signout } from '../controllers/auth';
import { userSignUpValidator } from '../validator/index';

const authRouter = Router();

// @route    Get api/users
// @desc     Signup route
// @access   Public
authRouter.post('/signup', userSignUpValidator, signup);
authRouter.post('/signin', signin);
authRouter.get('/signout', signout);

export { authRouter };
