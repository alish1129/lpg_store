import ProductModel from '..//models/product';
import formidable from 'formidable';
import * as _ from 'lodash';
import fs from 'fs';
import errorHandler from '../helpers/dbErrorHandler';
import { NextFunction } from 'express';

export default class ProductController {
	constructor() {}

	create = (req: any, res: any) => {
		let form = new formidable.IncomingForm({});
		let images: any = [];
		form.keepExtensions = true;
		form.multiples = true;
		form.parse(req, (err, fields, files) => {
			if (err) {
				return res.status(400).json({
					error: 'Image could not be uploaded'
				});
			}

			images.push(files.images);

			const { name, description, price, category, quantity, shipping, shippingCharges } = fields;

			if (!name || !description || !price || !category || !quantity) {
				return res.status(400).json({
					error: 'All fields are required'
					//@ts-ignore
				});
			}

			if (images[0].size === 0) {
				return res.status(400).json({
					error: 'Image of the product is required'
				});
			}

			let product = new ProductModel(fields);

			//@ts-ignore
			if (images[0].size != 0 && images.length > 0) {
				//@ts-ignore
				for (let i = 0; i < images.length; i++) {
					//@ts-ignore
					if (images[i].size > 1000000) {
						return res.status(400).json({
							error: 'Image should be less than 1Mb in size.'
						});
					}
					//@ts-ignore
					product.images.data[i] = fs.readFileSync(images[i].path);
					//@ts-ignore
					product.images.contentType[i] = images[i].type;
				}
			}

			product.save((err: any, product: any) => {
				if (err) {
					return res.status(400).json({
						error: errorHandler(err)
					});
				}
				product.images = undefined;

				res.json({ product });
			});
		});
	};

	productById = (req: any, res: any, next: NextFunction, id: string) => {
		ProductModel.findById(id).exec((err: any, product: any) => {
			if (err || !product) {
				return res.status(400).json({
					error: 'Product not found'
				});
			}
			req.product = product;
			next();
		});
	};

	getProduct = (req: any, res: any) => {
		req.product.images = undefined;
		return res.json(req.product);
	};

	removeProduct = (req: any, res: any) => {
		let product = req.product;
		product.remove((err: any, deletedProduct: any) => {
			if (err) {
				{
					res.status(400).json({
						deleted: false,
						err: 'The product could not be removed'
					});
				}
			}
			deletedProduct.images = undefined;
			res.json({
				deletedProduct,
				deleted: true,
				message: 'Product successfully deleted.'
			});
		});
	};

	updateProduct = (req: any, res: any) => {
		let form = new formidable.IncomingForm({});
		let images: any = [];
		form.keepExtensions = true;
		form.multiples = true;
		form.parse(req, (err, fields, files) => {
			if (err) {
				return res.status(400).json({
					error: 'Image could not be uploaded'
				});
			}

			images.push(files.images);

			const { name, description, price, category, quantity, shipping, shippingCharges } = fields;

			if (!name || !description || !price || !category || !quantity) {
				return res.status(400).json({
					error: 'All fields are required'
					//@ts-ignore
				});
			}

			if (images[0].size === 0) {
				return res.status(400).json({
					error: 'Image of the product is required'
				});
			}

			let product = req.product;
			product = _.extend(product, fields);

			//@ts-ignore
			if (images[0].size != 0 && images.length > 0) {
				//@ts-ignore
				for (let i = 0; i < images.length; i++) {
					//@ts-ignore
					if (images[i].size > 1000000) {
						return res.status(400).json({
							error: 'Image should be less than 1Mb in size.'
						});
					}
					//@ts-ignore
					product.images.data[i] = fs.readFileSync(images[i].path);
					//@ts-ignore
					product.images.contentType[i] = images[i].type;
				}
			}

			product.save((err: any, product: any) => {
				if (err) {
					return res.status(400).json({
						error: errorHandler(err)
					});
				}
				product.images = undefined;
				res.json({ product });
			});
		});
	};

	getAllProductsByCategory(req: any, res: any) {
		const category = req.category;

		ProductModel.find({ category: category.id }).exec((err: any, result: any) => {
			if (err) {
				return res.status(400).json({
					error: 'Could not find the category'
				});
			}
			res.json({ result });
		});
	}

	list(req: any, res: any) {
		let limit = req.query.limit ? req.query.limit : 10;
		let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
		let order = req.query.order ? req.query.order : 'asc';

		ProductModel.find()
			.select('-images')
			.populate('CategoryModel')
			.sort([ [ sortBy, order ] ])
			.limit(parseInt(limit))
			.exec((err: any, data) => {
				console.log(err);

				if (err) {
					return res.status(400).json({
						error: err
					});
				}

				res.send({ data });
			});
	}

	relatedList(req: any, res: any) {
		let limit = req.query.limit ? req.query.limit : 10;

		ProductModel.find({ _id: { $ne: req.product }, category: req.product.category })
			.limit(parseInt(limit))
			.populate('CategoryModal', '_id name')
			.exec((err: any, products: any) => {
				console.log(err);

				if (err) {
					return res.status(400).json({
						error: 'Products not found'
					});
				}
				products.images = undefined;
				res.send(products);
			});
	}

	listCategories(req: any, res: any) {
		ProductModel.distinct('CategoryModel', {}, (err: any, categories: any) => {
			console.log(err);

			if (err) {
				return res.status(400).json({
					error: 'Categories not found',
					err: err
				});
			}
			res.json(categories);
		});
	}

	listSearch(req: any, res: any) {
		const query: any = {};
		// assign search value to query.name
		if (req.query.search) {
			query.name = { $regex: req.query.search, $options: 'i' };
			// assigne category value to query.category
			if (req.query.category && req.query.category != 'All') {
				query.category = req.query.category;
			}
			// find the product based on query object with 2 properties
			// search and category
			ProductModel.find(query, (err: any, products: any) => {
				if (err) {
					return res.status(400).json({
						error: errorHandler(err)
					});
				}
				res.json(products);
			}).select('-photo');
		}
	}

	listBySearch(req: any, res: any) {
		let order = req.body.order ? req.body.order : 'desc';
		let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
		let limit = req.body.limit ? parseInt(req.body.limit) : 100;
		let skip = parseInt(req.body.skip);
		let findArgs: any = {};

		for (let key in req.body.filters) {
			if (req.body.filters[key].length > 0) {
				if (key === 'price') {
					// gte -  greater than price [0-10]
					// lte - less than
					findArgs[key] = {
						$gte: req.body.filters[key][0],
						$lte: req.body.filters[key][1]
					};
				} else {
					findArgs[key] = req.body.filters[key];
				}
			}
		}

		ProductModel.find(findArgs)
			.select('-images')
			.populate('CategoryModal')
			.sort([ [ sortBy, order ] ])
			.skip(skip)
			.limit(limit)
			.exec((err, data) => {
				if (err) {
					return res.status(400).json({
						error: 'Products not found'
					});
				}
				res.json({
					size: data.length,
					data
				});
			});
	}

	decreaseQuantity = (req: any, res: any, next: NextFunction) => {
		let bulkOps = req.body.order.products.map((item: any) => {
			return {
				updateOne: {
					filter: { _id: item._id },
					update: { $inc: { quantity: -item.count, sold: +item.count } }
				}
			};
		});

		ProductModel.bulkWrite(bulkOps, {}, (error: any, products: any) => {
			if (error) {
				return res.status(400).json({
					error: 'Could not update product'
				});
			}
			next();
		});
	};

	getImages(req: any, res: any, next: NextFunction) {}
}
