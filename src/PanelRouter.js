import React, {Fragment} from 'react';
import {Route, Switch} from 'react-router-dom';
import {APP_ROUTES} from "./config/Config";
import HomePage from "./components/Panel/Home/HomePage";
import DownloadPage from "./components/Panel/Download/DownloadPage";
import SubscriptionPage from "./components/Panel/Subscription/SubscriptionPage";
import ConfigurationPage from "./components/Panel/Configuration/ConfigurationPage";
import UserCog from "./components/Panel/User/UserCog";


/**
 * Route for authenticated user
 * @param account
 * @returns {*}
 */
const authenticatedRoute = (account) => {
    return (
        <Fragment>
            <Route exact path={APP_ROUTES['PANEL_HOME']} render={p => <HomePage {...p} account={account} /> } />
            <Route exact path={APP_ROUTES['PANEL_DOWNLOAD']} render={p => <DownloadPage {...p} account={account} /> } />
            <Route exact path={APP_ROUTES['PANEL_SUBSCRIPTION']} render={p => <SubscriptionPage {...p} account={account} /> } />
            { account.isCustomer ? customerRoute(account) : null}
        </Fragment>
    );
};

/**
 * Route for customer
 * @param account
 * @returns {*}
 */
const customerRoute = (account) => {
    return(
        <Fragment>
            <Route exact path={APP_ROUTES['PANEL_CONFIGURATION']} render={p => <ConfigurationPage {...p} account={account} /> } />
            <Route exact path={APP_ROUTES['PANEL_USER_COG']} render={p => <UserCog {...p} account={account} /> } />
        </Fragment>
    );
};

function PanelRouter({account}){
    return(
        <Switch>
            { account.length !== 0 ? authenticatedRoute(account) : null }
        </Switch>
    );
}

export default PanelRouter;