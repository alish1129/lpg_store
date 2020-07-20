import ProductModel from '..//models/product';
import formidable from 'formidable';
import * as _ from 'lodash';
import fs from 'fs';
import errorHandler from '../helpers/dbErrorHandler';
import { NextFunction } from 'express';

export const create = (req: any, res: any) => {
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

		product.save((err, result) => {
			if (err) {
				return res.status(400).json({
					error: errorHandler(err)
				});
			}
			res.json(result);
		});
	});
};

export const productById = (req: any, res: any, next: NextFunction, id: string) => {
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

export const getProduct = (req: any, res: any) => {
	req.product.images = undefined;
	return res.json(req.product);
};

export const removeProduct = (req: any, res: any) => {
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

		res.json({
			deletedProduct,
			deleted: true,
			message: 'Product successfully deleted.'
		});
	});
};
