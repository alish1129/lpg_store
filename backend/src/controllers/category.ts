import CategoryModel from '../models/category';
import errorHandler from '../helpers/dbErrorHandler';
import { Request, Response, NextFunction } from 'express';

export const create = (req: Request, res: Response, next: NextFunction) => {
	const category = new CategoryModel(req.body);

	category.save((err, data) => {
		if (err) {
			return res.status(400).json({
				error: errorHandler(err)
			});
		}
		res.json({ data });
	});
};
