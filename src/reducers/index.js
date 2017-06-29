import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import userReducer from './userReducer';

const reducers = combineReducers({
	user: userReducer,
	router: routerReducer
});

export default reducers;
