import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';

import authentication from './authentication';
import recommender from './recommender';
import twitter from './twitter';
import trends from "./trends";

const reducers = combineReducers({
	authentication,
	recommender,
    twitter,
	trends,
	router: routerReducer,
	form: formReducer
});

export default reducers;
