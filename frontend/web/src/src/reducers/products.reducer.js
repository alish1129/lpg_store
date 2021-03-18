import { GET_PRODUCTS_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
	loading: true,
	products: []
};

export default (state = INITIAL_STATE, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_PRODUCTS_SUCCESS:
			return {
				...state,
				products: payload,
				loading: false
			};
			break;

		default:
			return state;
	}
};
