import React from 'react';
import BgContainer from "../BgContainer";
import mirage from '../../assets/img/mirage.jpg';
import LoginForm from "./LoginForm";

function Login(){
    return(
        <div id="login">
            <BgContainer backgroundImage={mirage} />

            <div id="login-content" className="content container">
                <LoginForm />
            </div>
        </div>
    );
}

export default Login;