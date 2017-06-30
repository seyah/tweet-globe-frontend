import React from 'react';
import {Provider} from 'react-redux';
import {ConnectedRouter, routerMiddleware} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import {bindActionCreators} from 'redux';
import {setupAxiosInterceptors} from 'rest/rest';
import {redirectToLoginWithMessage, logout} from 'reducers/authentication';

import reducers from './reducers';
import {createStore, applyMiddleware, compose} from 'redux';
import DevTools, {devtools} from './config/devtools';
import promiseMiddleware from './config/promiseMiddleware';
import thunkMiddleware from 'redux-thunk';

import routes from './routes';
import Page from './ui/containers/layouts/Page';
import './ui/style/index.scss';

const history = createHistory();
const middlewares = process.env.NODE_ENV === 'development' ?
	[applyMiddleware(thunkMiddleware, promiseMiddleware, routerMiddleware(history)), DevTools.instrument()] :
	[applyMiddleware(thunkMiddleware, promiseMiddleware, routerMiddleware(history))];

export const store = createStore(reducers, compose(...middlewares, window.devToolsExtension ? window.devToolsExtension() : f => f));

const actions = bindActionCreators({redirectToLoginWithMessage, logout}, store.dispatch);
setupAxiosInterceptors(() => actions.redirectToLoginWithMessage('login.error.unauthorized'));

const App = () => (
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<Page>
				{devtools}
				{routes(actions.logout)}
			</Page>
		</ConnectedRouter>
	</Provider>
);

export default App;
