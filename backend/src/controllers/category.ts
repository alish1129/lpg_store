import CategoryModel from '../models/category';
import errorHandler from '../helpers/dbErrorHandler';
import { Request, Response, NextFunction } from 'express';

export default class CategoryController {
	create = (req: Request, res: Response, next: NextFunction) => {
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

	getCategoryById = (req: any, res: any, next: NextFunction, id: string) => {
		CategoryModel.findById(id).exec((err: any, category: any) => {
			if (err || !category) {
				return res.status(400).json({
					error: 'Category does not exist'
				});
			}
			req.category = category;
			next();
		});
	};

	read = (req: any, res: any, next: NextFunction) => {
		return res.json({ category: req.category });
	};

	updateCategory = (req: any, res: any) => {
		const category = req.category;
		category.name = req.body.name;
		category.save((err: any, category: any) => {
			if (err) {
				return res.status(400).json({
					error: errorHandler(err)
				});
			}
			res.json({ category });
		});
	};

	deleteCategory = (req: any, res: any) => {
		let category = req.category;
		category.remove((err: any, category: any) => {
			if (err) {
				{
					res.status(400).json({
						deleted: false,
						err: 'The category could not be removed'
					});
				}
			}
			res.json({
				category,
				deleted: true,
				message: 'Category successfully deleted.'
			});
		});
	};

	listAllCategories = (req: any, res: any) => {
		CategoryModel.find().exec((err, data) => {
			if (err) {
				return res.status(400).json({
					error: errorHandler(err)
				});
			}

			res.json(data);
		});
	};
}
