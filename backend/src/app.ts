import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import expressValidator from 'express-validator';
import * as dotenv from 'dotenv';

import connectDB from './database';
import { authRouter } from './routes/auth';
import { inventoriesRouter } from './routes/inventories';

dotenv.config();

const app: Application = express();

connectDB();
//Define Routes

//Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());

app.get('/', (req, res) => {
	res.send('Hello');
});

//Routes Middleware
app.use('/api', authRouter);
app.use('/api', inventoriesRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server started at ${PORT}`);
});
