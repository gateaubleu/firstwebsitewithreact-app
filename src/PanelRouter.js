import React, {Fragment} from 'react';
import {Route, Switch} from 'react-router-dom';
import {APP_ROUTES} from "./config/Config";
import HomePage from "./components/Panel/Home/HomePage";
import DownloadPage from "./components/Panel/Download/DownloadPage";
import SubscriptionPage from "./components/Panel/Subscription/SubscriptionPage";
import ConfigurationPage from "./components/Panel/Configuration/ConfigurationPage";
import UserCogPage from "./components/Panel/User/UserCogPage";
import UpdateCheatPage from "./components/Panel/Administration/UpdateCheat/UpdateCheatPage";


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
            { account.isCustomer ? customerRoute(account) : null }
            { account.isModerator ? moderatorRoute(account) : null }
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
            <Route exact path={APP_ROUTES['PANEL_USER_COG']} render={p => <UserCogPage {...p} account={account} /> } />
        </Fragment>
    );
};

const moderatorRoute = (account) => {
    return(
        <Fragment>
            <Route exact path={APP_ROUTES['PANEL_UPDATE_CHEAT']} render={p => <UpdateCheatPage {...p} account={account} /> } />
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