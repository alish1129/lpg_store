import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import expressValidator from 'express-validator';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './database';
import { authRouter } from './routes/auth';
import { inventoriesRouter } from './routes/inventories';
import { categoryRouter } from './routes/category';
import { userRouter } from './routes/user';
import { productRouter } from './routes/product';
import { brainTreeRouter } from './routes/braintree';

dotenv.config();

const app: Application = express();

const options: cors.CorsOptions = {
	allowedHeaders: [ 'Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token' ],
	credentials: true,
	methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE'
};

connectDB();
//Define Routes

//Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());

app.use(cors(options));

app.get('/', (req, res) => {
	res.send('Hello');
});

//Routes Middleware
app.use('/api', authRouter);
app.use('/api', inventoriesRouter);
app.use('/api', categoryRouter);
app.use('/api', userRouter);
app.use('/api', productRouter);
app.use('/api', brainTreeRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server started at ${PORT}`);
});
