import React from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import {APP_ROUTES} from "./config/Config";
import Home from './components/Home/Home';
import Price from "./components/Pricing/Price";

const NotFound = () => {
    return <p>Tous les chemins ne ménent pas toujours à <Link to={APP_ROUTES['HOME']}>Rome</Link>.</p>
};

function AppRouter({authenticated}) {
    return (
        <Switch>
            <Route exact path={APP_ROUTES['HOME']} component={Home}/>
            <Route exact path={APP_ROUTES['PRICES']} component={Price}/>
            <Route component={NotFound}/>
        </Switch>

    );
}

export default AppRouter;