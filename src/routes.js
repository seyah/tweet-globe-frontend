import React from 'react';
import {Route, Redirect} from 'react-router';
import HomePage from './containers/pages/HomePage';

function scrollToTop() {
	window.scrollTo(0, 0);
}

const Routes = () => {
	return ([
		<Route key={0} path="/" onEnter={scrollToTop} component={() => <HomePage />}/>
	]);
};

export default Routes;
