import React from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import {ConnectedRouter, routerMiddleware} from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';

import './style/index.scss';
import Routes from './routes';
import Page from './containers/layouts/Page';
import reducers from './reducers';

const history = createHistory();
const middleware = routerMiddleware(history);
export const store = createStore(
	reducers,
	compose(applyMiddleware(thunkMiddleware, middleware), window.devToolsExtension ? window.devToolsExtension() : f => f)
);

if (module.hot) {
	module.hot.accept('./reducers/index.js', () =>
		store.replaceReducer(require('./reducers/index.js').default)
	);
}

const App = () => (
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<Page>
				{Routes()}
			</Page>
		</ConnectedRouter>
	</Provider>
);

export default App;
