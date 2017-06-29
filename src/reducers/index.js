import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {reducer as formReducer} from 'redux-form'

import userReducer from './userReducer';

const reducers = combineReducers({
	user: userReducer,
	router: routerReducer,
	form: formReducer
});

export default reducers;
