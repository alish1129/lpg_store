import mongoose, { Schema } from 'mongoose';
import crypto from 'crypto';
import { v1 } from 'uuid';

export interface IUser extends Document {
	name: String;
	email: String;
	hashed_password: String;
	user_location: String;
	salt: String;
	role: Number;
	purchase_history: Array<String>;
	sell_history: Array<String>;
	timestamps: String;
}

const userSchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
			maxlength: 32
		},
		email: {
			type: String,
			trim: true,
			required: true,
			unique: 32
		},
		hashed_password: {
			type: String,
			required: true
		},
		location: {
			type: Array,
			default: []
		},
		shippingAddresses: {
			type: Array,
			default: []
		},
		salt: String,
		role: {
			type: Number,
			default: 0
		},
		purchase_history: {
			type: Array,
			default: []
		},
		sell_history: {
			type: Array,
			default: []
		},
		inventories: {
			type: Array,
			default: []
		}
	},
	{ timestamps: true }
);

//Virtual Field

userSchema
	.virtual('password')
	.set(function(this: any, password: string) {
		this._password = password;
		this.salt = v1();
		this.hashed_password = this.encryptPassword(password);
	})
	.get(function(this: any) {
		return this._password;
	});

userSchema.methods = {
	authenticate: function(this, plainText: String) {
		return this.encryptPassword(plainText) === this.hashed_password;
	},

	encryptPassword: function(this: any, password: string) {
		if (!password) return '';
		try {
			return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
		} catch (err) {
			return '';
		}
	}
};

export default mongoose.model('UserModel', userSchema);
