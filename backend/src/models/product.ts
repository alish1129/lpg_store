import mongoose, { Schema } from 'mongoose';

//@ts-ignore
export interface IProduct extends Document {
	name: String;
	description: String;
	price: Number;
	category: any;
	quantity: number;
	images: Buffer;
	shipping: Boolean;
	shippindCharges: Number;
	timestamps: String;
}

const ObjectId = Schema.Types.ObjectId;

const productSchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
			maxlength: 32
		},
		description: {
			type: String,
			required: true,
			maxlength: 2000
		},
		price: {
			type: Number,
			trim: true,
			required: true,
			maxlength: 32
		},
		category: {
			type: ObjectId,
			ref: 'Category',
			required: true
		},
		quantity: {
			type: Number,
			required: true
		},
		images: {
			data: Array,
			contentType: Array
		},
		shipping: {
			required: false,
			type: Boolean
		},
		shippingCharge: {
			type: Number,
			trim: true,
			required: true,
			maxlength: 32
		}
	},
	{ timestamps: true }
);

export default mongoose.model('ProductModel', productSchema);
