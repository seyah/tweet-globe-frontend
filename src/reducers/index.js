import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';

import authentication from './authentication';
import recommender from './recommender';
import twitter from './twitter';

const reducers = combineReducers({
	authentication,
	recommender,
    twitter,
	router: routerReducer,
	form: formReducer
});

export default reducers;
