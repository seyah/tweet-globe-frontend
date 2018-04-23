import React from 'react';
import {Route} from 'react-router';
import HomePage from '../ui/containers/pages/HomePage';
import axios from 'axios';
import AccountPage from '../ui/containers/pages/AccountPage';
import LoginPage from '../ui/containers/pages/LoginPage';
import RegisterPage from "../ui/containers/pages/RegisterPage";
import AuthenticatedRoute from "./AuthenticatedRoute";
import Page from "../ui/containers/layouts/Page";
import AnonymousRoute from "./AnonymousRoute";
import PreferencesPage from "../ui/containers/pages/PreferencesPage";
import TrendsPage from "../ui/containers/pages/TrendsPage";
import UserAnalysisPage from "../ui/containers/pages/UserAnalysisPage";
import RecommenderPage from "../ui/containers/pages/RecommenderPage";

const instance = axios.create({
    // TODO Assign URL of API
    baseURL: '//localhost:8082',
    withCredentials: true
});

function scrollToTop() {
    window.scrollTo(0, 0);
}

export default () => {
    return (
        <Page>
            <Route key={0} path="/" onEnter={scrollToTop} exact render={() => <HomePage/>}/>
            <AnonymousRoute key={-1} path="/login" onEnter={scrollToTop} render={() => <LoginPage/>}/>
            <AnonymousRoute key={-2} path="/register" onEnter={scrollToTop} render={() => <RegisterPage/>}/>
            <AuthenticatedRoute key={1} path="/account" onEnter={scrollToTop} render={() => <AccountPage/>}/>
            <AuthenticatedRoute key={2} path="/preferences" onEnter={scrollToTop} render={() => <PreferencesPage/>}/>
            <AuthenticatedRoute key={2} path="/recommendations" onEnter={scrollToTop} render={() => <RecommenderPage/>}/>
            <AuthenticatedRoute key={3} path="/trends" onEnter={scrollToTop} render={() => <TrendsPage/>}/>
            <AuthenticatedRoute key={4} path="/user-analysis" onEnter={scrollToTop} render={() => <UserAnalysisPage/>}/>
        </Page>
    );
};