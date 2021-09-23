import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Login from './pages/Login';
import BlogOverview from './pages/BlogOverview';
import BlogPost from './pages/BlogPost';
import './App.css';

import { useGlobalState, GlobalContext } from './components/globals';

/**
 * renders the correct nodes based on the user state
 * 
 * @param {object} children contains the underlaying nodes
 * @param {boolean} authState contains the user state
 * @param {object} rest provides the data
 * @returns 
 */
function PrivateRoute({ children, authState, ...rest }) {
    return (
        <Route {...rest}>
            {authState ? children : <Redirect to="/login" />}
        </Route>
    );
}

export default function App() {
    const globalState = useGlobalState();
    return (
        <GlobalContext.Provider value={globalState}>
            <Navigation />
            <div id='content'>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/login" >
                        <Login />
                    </Route>
                    <PrivateRoute exact path="/blogposts" authState={globalState.isAuthenticated}>
                        <BlogOverview />
                    </PrivateRoute>
                    <PrivateRoute path="/blog/:id" authState={globalState.isAuthenticated}>
                        <BlogPost />
                    </PrivateRoute>
                </Switch>
            </div>
        </GlobalContext.Provider>
    );
};
