import React from 'react';
import {Link} from 'react-router-dom';
import ToastList from "./Toaster/ToastsList";
import AppRouter from "../AppRouter";
import Footer from "./Footer";
import {APP_ROUTES} from "../config/Config";
import {TOAST_ENUM} from "./Toaster/ToastEnum";

function MainPage({account, logo, onLogout}){
    return(
        <div>
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
                                {account.length !== 0 ?
                                    <Link className="nav-link" to={APP_ROUTES['PANEL_HOME']}>Member Area</Link> :
                                    <Link className="nav-link" to={APP_ROUTES['LOGIN']}>Login</Link>}
                            </li>
                            <li className="nav-item">
                                {account.length !== 0 ?
                                    <Link className="nav-link" onClick={e => onLogout()} to={APP_ROUTES['LOGIN']}>Logout</Link> :
                                    <Link className="nav-link" to={APP_ROUTES['REGISTER']}>Register</Link>}
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
    )
};

export default MainPage;