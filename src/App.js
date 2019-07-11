import React from 'react';
import './App.css';
import logo from './assets/img/logo.png';
import AppRouter from './AppRouter';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import {APP_ROUTES} from "./config/Config";
import Footer from './components/Footer';

class App extends React.Component{

    constructor(props){
        super(props);
        this.state = {

        };
    }

    render(){
    const {account} = this.props;
        return (
            <Router>
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
                                        <Link className="nav-link" to={APP_ROUTES['LOGIN']}>Login</Link>
                                    </li>

                                </ul>
                            </div>
                        </nav>
                    </header>
                    <section>
                        <AppRouter authenticated={false}/>
                    </section>

                    <Footer logo={logo}/>

                </div>
            </Router>
        );
    }
}

export default App;
