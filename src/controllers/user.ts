import { Request, Response, NextFunction } from 'express';

import userModel from '../models/user';

export const userById = (req: any, res: Response, next: NextFunction, id: string) => {
	userModel.findById(id).exec((err: any, user: any) => {
		if (err || !user) {
			return res.status(400).json({
				error: 'User not found'
			});
		}
		user.salt = undefined;
		user.hashed_password = undefined;
		req.profile = user;
		next();
	});
};
