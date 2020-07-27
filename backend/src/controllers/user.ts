import { Request, Response, NextFunction } from 'express';
import errorHandler from '../helpers/dbErrorHandler';

import userModel from '../models/user';

export default class UserController {
	userById = (req: any, res: Response, next: NextFunction, id: string) => {
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

	updateUserProfile = (req: any, res: any) => {
		userModel.findOneAndUpdate(
			{ _id: req.profile.id },
			{ $set: req.body },
			{ new: true },
			(err: any, user: any) => {
				if (err) {
					return res.status(400).json({
						error: 'Something went wrong'
					});
				}
				user.hashed_password = undefined;
				user.salt = undefined;
				res.json(user);
			}
		);
	};

	getAllUsers = (req: any, res: any, next: NextFunction) => {
		userModel.find().exec((err: any, users: any) => {
			if (err || !users) {
				return res.status(400).json({
					error: 'Users not found'
				});
			}

			users.forEach((user: any) => {
				user.salt = undefined;
				user.hashed_password = undefined;
			});

			res.json({ users });
		});
	};

	getAllAdminUsers = (req: any, res: any, next: NextFunction) => {
		userModel.find({ role: '1' }).exec((err: any, users: any) => {
			if (err || !users) {
				return res.status(400).json({
					error: 'Users not found'
				});
			}

			users.forEach((user: any) => {
				user.salt = undefined;
				user.hashed_password = undefined;
			});

			res.json({ users });
		});
	};
}
