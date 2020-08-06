import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Routes from './Route';
import { persistor, store } from './store';

const app = (
	<PersistGate persistor={persistor}>
		<Routes />
	</PersistGate>
);

ReactDOM.render(<Provider store={store}>{app}</Provider>, document.getElementById('root'));
