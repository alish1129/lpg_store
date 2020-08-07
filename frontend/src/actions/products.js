import { GET_PRODUCTS_SUCCESS } from './types';

export const getAllProducts = (sortBy = 'price', order = 'desc', limit = 5) => async (dispatch) => {
	const result = await fetch(`/api/products?sortBy=${sortBy}&order=${order}&limit=${limit}`).then((res) =>
		res.json()
	);
	dispatch({ type: GET_PRODUCTS_SUCCESS, payload: result.data });
};
