import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import {combineReducers, createStore} from "redux";
import {Provider} from 'react-redux';
import toastReducer from './reducers/ToastReducer';
import accountReducer from "./reducers/AccountReducer";
import {BrowserRouter as Router} from 'react-router-dom';

const store = createStore(combineReducers({
    toasts: toastReducer,
    account: accountReducer
}),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
<Provider store={store}>
    <Router>
        <App />
    </Router>
</Provider>, document.getElementById('root'));

window.store = store;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
