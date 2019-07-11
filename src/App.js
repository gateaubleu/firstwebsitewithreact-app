import React from 'react';
import './App.css';
import logo from './assets/img/logo.png';
import AppRouter from './AppRouter';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import {APP_ROUTES} from "./config/Config";

function App() {
    return (
        <Router>
            <div className="App">
                <header>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-transparent mx-auto">
                        <div id="logo-container">
                            <a className="navbar-brand" href="#">TakeUrBalls</a>
                            <img src={logo} id="logo" alt="Logo" />
                        </div>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
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
                                    <a className="nav-link" href="#">Features</a>
                                </li>

                            </ul>
                        </div>
                    </nav>
                </header>
                <section>
                    <AppRouter authenticated={true}/>
                </section>
            </div>
        </Router>
    );
}

export default App;
