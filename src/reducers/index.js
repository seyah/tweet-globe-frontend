import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import sampleReducer from './sampleReducer';

const reducers = combineReducers({
	sampleReducer,
	router: routerReducer
});

export default reducers;
