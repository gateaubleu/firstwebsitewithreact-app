import React from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import {APP_ROUTES} from "./config/Config";
import HomePage from './components/Home/HomePage';
import PricePage from "./components/Pricing/PricePage";
import LoginPage from "./components/Authentication/LoginPage";
import RegisterPage from "./components/Authentication/RegisterPage";

const NotFound = () => {
    return <p>Tous les chemins ne ménent pas toujours à <Link to={APP_ROUTES['HOME']}>Rome</Link>.</p>
};

function AppRouter({authenticated}) {
    return (
        <Switch>
            <Route exact path={APP_ROUTES['HOME']} component={HomePage}/>
            <Route exact path={APP_ROUTES['PRICES']} component={PricePage}/>
            {!authenticated ? <Route path={APP_ROUTES['LOGIN']} component={LoginPage}/> : <Route path={APP_ROUTES['LOGIN']} component={LoginPage}/>}
            {!authenticated ? <Route path={APP_ROUTES['REGISTER']} component={RegisterPage}/> : <Route path={APP_ROUTES['REGISTER']} component={RegisterPage}/>}
            <Route component={NotFound}/>
        </Switch>

    );
}

export default AppRouter;