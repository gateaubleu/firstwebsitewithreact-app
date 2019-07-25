import React from 'react';
import './App.css';
import logo from './assets/img/logo.png';
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import AccountManagement from "./components/Authentication/AccountManagement";
import {removeAccount} from "./reducers/actions/AccountActions";
import {addToast} from "./reducers/actions/ToastActions";
import {TOAST_ENUM} from "./components/Toaster/ToastEnum";
import MainPage from "./components/MainPage";
import PanelPage from "./components/Panel/PanelPage";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    /**
     * Allow user to logout
     */
    onLogout() {
        this.props.addToast(TOAST_ENUM['SUCCESS'], 'You have been successfully disconnected.');
        localStorage.clear();
        this.props.removeAccount();
    }

    render() {
        return (
            <div className="App">
                <AccountManagement />
                {!this.props.location.pathname.startsWith("/panel/") ?
                    <MainPage account={this.props.account} onLogout={this.onLogout.bind(this)} logo={logo} /> :
                    <PanelPage logo={logo}/>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        account: state.account
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addToast: (type, content) => {
            dispatch(addToast(type, content))
        },
        removeAccount: () => {
            dispatch(removeAccount());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
