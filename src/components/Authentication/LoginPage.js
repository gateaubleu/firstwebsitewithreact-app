import React from 'react';
import BgContainer from "../BgContainer";
import mirage from '../../assets/img/mirage.jpg';
import LoginForm from "./LoginForm";

function LoginPage(){
    return(
        <div id="login">
            <BgContainer backgroundImage={mirage} />

            <div id="login-content" style={{marginTop: '80px', paddingBottom: '80px'}} className="content container">
                <LoginForm />
            </div>
        </div>
    );
}

export default LoginPage;