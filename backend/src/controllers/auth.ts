import { Request, Response, NextFunction, response } from 'express';
import jwt from 'jsonwebtoken'; // To generate signed token
import expressJWT from 'express-jwt'; // Authorization Check

import UserModel from '../models/user';
import errorHandler from '../helpers/dbErrorHandler';

require('dotenv').config();

export const signup = (req: Request, res: Response, next: NextFunction) => {
	const user = new UserModel(req.body);

	user.save((error: any, user: any) => {
		if (error) {
			return res.status(400).json({
				err: errorHandler(error)
			});
		}
		user.salt = undefined;
		user.hashed_password = undefined;

		res.json({ user });
	});
};

export const signin = (req: Request, res: Response, next: NextFunction) => {
	const { email, password } = req.body;

	UserModel.findOne({ email }, (err: any, user: any) => {
		if (err || !user) {
			return res.status(400).json({
				error: 'User with the email does not exist. Please signup'
			});
		}

		if (!user.authenticate(password)) {
			return res.status(401).json({
				error: 'Email and Password do not match'
			});
		}
		//generate a signed token with userId and secret
		//@ts-ignore
		const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);

		//persist the token as 't' in cookie with expiry date

		let currentDate = new Date().getTime();

		res.cookie('t', token, { expires: new Date(currentDate + 9999) });

		const { _id, name, email, role, purchase_history, sell_history, watchlist } = user;
		return res.json({
			token,
			user: {
				_id,
				email,
				name,
				role,
				purchase_history,
				sell_history,
				watchlist
			}
		});
	});
};

export const signout = (req: Request, res: Response) => {
	res.clearCookie('t');
	res.json({ message: 'User successfully signed out!' });
};

export const requireSignIn = expressJWT({
	//@ts-ignore
	secret: process.env.JWT_SECRET,
	userProperty: 'auth'
});

export const isAuth = (req: any, res: Response, next: NextFunction) => {
	let user = req.profile && req.auth && req.profile._id == req.auth._id;
	if (!user) {
		return res.status(403).json({
			error: 'Access Denied'
		});
	}
	next();
};

export const isAdmin = (req: any, res: any, next: NextFunction) => {
	if (req.auth.role !== 1) {
		return res.status(403).json({
			error: 'Admin resourse! Access denied'
		});
	}
	next();
};
