import { Schema, model } from 'mongoose';

const categorySchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
			maxlength: 32,
			unique: 32
		}
	},
	{ timestamps: true }
);

export default model('CategoryModel', categorySchema);
