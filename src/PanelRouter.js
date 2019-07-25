import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {APP_ROUTES} from "./config/Config";
import HomePage from "./components/Panel/Home/HomePage";

function PanelRouter({authenticated}){
    return(
        <Switch>
            <Route exact path={APP_ROUTES['PANEL_HOME']} component={HomePage} />
        </Switch>
    );
}

export default PanelRouter;