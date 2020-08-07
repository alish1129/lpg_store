import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import persistReducer from 'redux-persist/es/persistReducer';

import productReducer from './products.reducer';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: [ 'product' ]
};

const rootReducer = combineReducers({
	products: productReducer
});

export default persistReducer(persistConfig, rootReducer);
