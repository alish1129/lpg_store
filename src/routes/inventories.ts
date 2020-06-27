import { Router } from 'express';
import { requireSignIn, isAdmin } from '../controllers/auth';

const inventoriesRouter = Router();

// @route    Get api/users
// @desc     Signup route
// @access   Public
inventoriesRouter.get('/order', requireSignIn, () => {
	console.log('order');
});
inventoriesRouter.post('/inventories', isAdmin, () => {
	console.log('order');
});

export { inventoriesRouter };
