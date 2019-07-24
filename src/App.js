import React from 'react';
import './App.css';
import logo from './assets/img/logo.png';
import AppRouter from './AppRouter';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import {APP_ROUTES} from "./config/Config";
import Footer from './components/Footer';
import ToastList from "./components/Toaster/ToastsList";
import {connect} from "react-redux";
import AccountManagement from "./components/Authentication/AccountManagement";
import {removeAccount} from "./reducers/actions/AccountActions";
import {addToast} from "./reducers/actions/ToastActions";
import {TOAST_ENUM} from "./components/Toaster/ToastEnum";

class App extends React.Component{

    constructor(props){
        super(props);
        this.state = {

        };
    }

    onLogout(){
        this.props.addToast(TOAST_ENUM['SUCCESS'], 'You have been successfully disconnected.');
        localStorage.clear();
        this.props.removeAccount();
    }

    render(){
    const {account} = this.props;
        return (
            <Router>
                <AccountManagement />
                <div className="App">
                    <header>
                        <nav className="navbar navbar-expand-lg navbar-dark bg-transparent mx-auto">
                            <Link className="navbar-brand" to={APP_ROUTES['HOME']}><img src={logo} alt=""/></Link>
                            <button className="navbar-toggler" type="button" data-toggle="collapse"
                                    data-target="#navbarNav"
                                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse offset-lg-4 offset-xl-4" id="navbarNav">
                                <ul className="navbar-nav mt-lg-0 mt-md-5 mt-sm-5 mt-5">
                                    <li className="nav-item">
                                        <Link className="nav-link" to={APP_ROUTES['HOME']}>Home</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to={APP_ROUTES['PRICES']}>Pricing</Link>
                                    </li>
                                    <li className="nav-item">
                                        {account.length !== 0 ? <Link className="nav-link" to={APP_ROUTES['LOGIN']}>Member Area</Link> : <Link className="nav-link" to={APP_ROUTES['LOGIN']}>Login</Link>}
                                    </li>
                                    <li className="nav-item">
                                        {account.length !== 0 ? <Link className="nav-link" onClick={e => this.onLogout()} to={APP_ROUTES['LOGIN']}>Logout</Link> : <Link className="nav-link" to={APP_ROUTES['REGISTER']}>Register</Link>}
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </header>
                    <section>
                        <ToastList/>

                        <AppRouter authenticated={account.length !== 0}/>
                    </section>

                    <Footer logo={logo}/>

                </div>
            </Router>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
