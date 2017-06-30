import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';

import authentication from './authentication';

const reducers = combineReducers({
	authentication,
	router: routerReducer,
	form: formReducer
});

export default reducers;
