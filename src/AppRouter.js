import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {APP_ROUTES} from "./config/Config";
import HomePage from './components/Home/HomePage';
import PricePage from "./components/Pricing/PricePage";
import LoginPage from "./components/Authentication/LoginPage";
import RegisterPage from "./components/Authentication/RegisterPage";


function AppRouter({authenticated}) {
    return (
        <Switch>
            <Route exact path={APP_ROUTES['HOME']} component={HomePage}/>
            <Route exact path={APP_ROUTES['PRICES']} component={PricePage}/>
            {!authenticated ? <Route path={APP_ROUTES['LOGIN']} component={LoginPage}/> : <Route path={APP_ROUTES['LOGIN']} component={LoginPage}/>}
            {!authenticated ? <Route path={APP_ROUTES['REGISTER']} component={RegisterPage}/> : <Route path={APP_ROUTES['REGISTER']} component={RegisterPage}/>}
            <Route component={HomePage}/>
        </Switch>

    );
}

export default AppRouter;