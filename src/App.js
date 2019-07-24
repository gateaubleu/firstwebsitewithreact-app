import React from 'react';
import './App.css';
import logo from './assets/img/logo.png';
import AppRouter from './AppRouter';
import {withRouter, Link} from 'react-router-dom';
import {APP_ROUTES} from "./config/Config";
import Footer from './components/Footer';
import ToastList from "./components/Toaster/ToastsList";
import {connect} from "react-redux";
import AccountManagement from "./components/Authentication/AccountManagement";
import {removeAccount} from "./reducers/actions/AccountActions";
import {addToast} from "./reducers/actions/ToastActions";
import {TOAST_ENUM} from "./components/Toaster/ToastEnum";
import MainPage from "./components/MainPage";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    onLogout() {
        const {addToast, removeAccount} = this.props;
        this.props.addToast(TOAST_ENUM['SUCCESS'], 'You have been successfully disconnected.');
        localStorage.clear();
        this.props.removeAccount();
    }

    render() {
        const {account} = this.props;
        //way to check if show panel or SPA
        console.log(this.props.location.pathname.startsWith("/panel/"));

        return (
            <div className="App">
                <AccountManagement />
                {!this.props.location.pathname.startsWith("/panel/") ?
                    <MainPage account={this.props.account} onLogout={this.onLogout.bind(this)} logo={logo} /> :
                    null
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
