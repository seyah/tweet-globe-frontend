import React from 'react';
import {Route, Redirect} from 'react-router';
import HomePage from './ui/containers/pages/HomePage';
import axios from 'axios';
import AccountPage from './ui/containers/pages/AccountPage';
import LoginPage from './ui/containers/pages/LoginPage';
import RegisterPage from "./ui/containers/pages/RegisterPage";

const instance = axios.create({
	// TODO Assign URL of API
	baseURL: '//localhost:8082',
	withCredentials: true
});

function scrollToTop() {
	window.scrollTo(0, 0);
}

const routes = (onLogout) => {
	return ([
		<Route key={0} path="/" onEnter={scrollToTop} exact component={() => <HomePage/>}/>,
		<Route key={-1} path="/login" onEnter={scrollToTop} component={() => <LoginPage/>}/>,
		<Route key={-2} path="/register" onEnter={scrollToTop} component={() => <RegisterPage/>}/>,
		<Route key={-3} path="/logout" onEnter={onLogout}/>,
		<PrivateRoute key={1} path="/protected" onEnter={scrollToTop} component={() => <AccountPage/>}/>
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

export default routes;
