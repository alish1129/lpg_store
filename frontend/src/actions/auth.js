import { USER_LOGGED_IN } from './types';

export const signupData = (user) => {
	return fetch(`/signup`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-type': 'application/json'
		},
		body: JSON.stringify(user)
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => {
			console.log(err);
		});
};

export const signinData = (user) => {
	return fetch(`/signin`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-type': 'application/json'
		},
		body: JSON.stringify(user)
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => {
			console.log(err);
		});
};
