import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';

import authentication from './authentication';
import twitter from './twitter';

const reducers = combineReducers({
	authentication,
    twitter,
	router: routerReducer,
	form: formReducer
});

export default reducers;
