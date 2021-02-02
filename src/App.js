import React, { lazy, Suspense, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch,
} from 'react-router-dom';
import useGlobalState from './globalStates/globalStates';
import ReactNotification from 'react-notifications-component';
import axios from 'axios';
import NProgress from 'nprogress';
import PrimaryPages from './pages/home/wrapper';

import './sass/style.scss';

const FirstEnter = lazy(() => import('./pages/first-enter/first-enter'));
const LoginOrSignup = lazy(() => import('./pages/login-Or-Signup/wrapper.js'));
// const PrimaryPages = lazy(() => import('./pages/home/wrapper'));

const LazyLoad = () => {
    useEffect(() => {
        NProgress.start();

        return () => {
            NProgress.done();
        };
    });

    return '';
};

function App() {
    // axios.defaults.baseURL = 'https://apiketabq.pouyadadeh.com/api';
    axios.defaults.baseURL = 'https://apiketabq.ketabq.com/api';
    const [started] = useGlobalState('started');
    const [token] = useGlobalState('token');

    return (
        <Router>
            <ReactNotification />
            <Suspense fallback={<LazyLoad />}>
                <Switch>
                    <Route path="/start">
                        <FirstEnter />
                    </Route>
                    <Route path="/login_signup/:ref?">
                        {!token ? <LoginOrSignup /> : <Redirect to="/" />}
                    </Route>
                    <Route path="/">
                        {started ? <PrimaryPages /> : <Redirect to="/start" />}
                    </Route>
                </Switch>
            </Suspense>
        </Router>
    );
}

export default App;
