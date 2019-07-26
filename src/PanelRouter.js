import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {APP_ROUTES} from "./config/Config";
import HomePage from "./components/Panel/Home/HomePage";
import DownloadPage from "./components/Panel/Download/DownloadPage";

function PanelRouter({account}){
    return(
        <Switch>
            <Route exact path={APP_ROUTES['PANEL_HOME']} render={p => <HomePage {...p} account={account} /> } />
            <Route exact path={APP_ROUTES['PANEL_DOWNLOAD']} render={p => <DownloadPage {...p} account={account} /> } />
        </Switch>
    );
}

export default PanelRouter;