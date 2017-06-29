import React from 'react';
import {Route, Redirect} from 'react-router';
import HomePage from './containers/pages/HomePage';
import axios from 'axios';
import AccountPage from './containers/pages/AccountPage';
import LoginPage from './containers/pages/LoginPage';

const instance = axios.create({
	// TODO Assign URL of API
	baseURL: '//localhost:8082',
	withCredentials: true
});

function scrollToTop() {
	window.scrollTo(0, 0);
}

const Routes = () => {
	return ([
		<Route key={0} path="/" exact component={() => <HomePage/>}/>,
		<Route key={-1} path="/login" component={() => <LoginPage/>}/>,
		<PrivateRoute key={1} path="/protected" component={() => <AccountPage/>}/>
	]);
};

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({component: Component, ...rest}) => (
	<Route
		{...rest}
		render={props => (
			<Component {...props}/>
			/* A auth.isAuthenticated ? (
				<Component {...props}/>
			) : (
				<Redirect to={{
					pathname: '/login',
					state: {from: props.location}
				}}/>
			) */
		)}/>
);

export default Routes;
