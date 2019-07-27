import React, {Fragment} from 'react';
import {Route, Switch} from 'react-router-dom';
import {APP_ROUTES} from "./config/Config";
import HomePage from "./components/Panel/Home/HomePage";
import DownloadPage from "./components/Panel/Download/DownloadPage";
import SubscriptionPage from "./components/Panel/Subscription/SubscriptionPage";


/**
 * If user is authenticated
 * @param account
 * @returns {*}
 */
const authenticatedRoute = (account) => {
    return (
        <Fragment>
            <Route exact path={APP_ROUTES['PANEL_HOME']} render={p => <HomePage {...p} account={account} /> } />
            <Route exact path={APP_ROUTES['PANEL_DOWNLOAD']} render={p => <DownloadPage {...p} account={account} /> } />
            <Route exact path={APP_ROUTES['PANEL_SUBSCRIPTION']} render={p => <SubscriptionPage {...p} account={account} /> } />
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