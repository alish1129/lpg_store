import mongoose from 'mongoose';

const connectDB = async () => {
	//Connect Database
	const URI = process.env.DATABASE_URI + '';

	try {
		await mongoose
			.connect(URI, {
				useUnifiedTopology: true,
				useNewUrlParser: true,
				useCreateIndex: true
			})
			.then((res) => console.log('Database Connected'));
	} catch (err) {
		console.log(err.message);
	}
};

export default connectDB;
