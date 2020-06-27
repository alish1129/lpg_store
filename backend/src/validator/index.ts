import { Request, Response, NextFunction } from 'express';

export const userSignUpValidator = (req: Request, res: Response, next: NextFunction) => {
	//Check for Name
	req.check('name', 'Name is required').notEmpty();

	//Check for Email
	req.check('email', 'Email is required').notEmpty();
	req
		.check('email', 'Email must be between 3 to 32 characters')
		.matches(
			/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
		)
		.withMessage('Email must be in a valid format. Example: example@mail.com')
		.isLength({
			min: 4,
			max: 320
		});
	//Check for Password
	req.check('password', 'Password is required').notEmpty();
	req
		.check('password')
		.isLength({ min: 8 })
		.withMessage('Password must contain at least 8 characters')
		.matches(/\d/)
		.withMessage('Password must contain a number');

	const errors = req.validationErrors();

	if (errors) {
		const firstError = errors.map((error: any) => error.msg)[0];
		return res.status(400).json({ error: firstError });
	}
	next();
};
