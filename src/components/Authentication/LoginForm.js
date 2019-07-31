import React from 'react';
import {API_ROUTES, API_URL, APP_ROUTES, PREFIX_LOCALSTORE, RECAPTCHA_KEY} from "../../config/Config";
import {connect} from "react-redux";
import {addToast, clearToasts} from "../../reducers/actions/ToastActions";
import {setAccount} from "../../reducers/actions/AccountActions";
import {TOAST_ENUM} from "../Toaster/ToastEnum";
import Recaptcha from "react-recaptcha";
import {Link, Redirect} from "react-router-dom";
import axios from "axios";

class LoginForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            captcha: '',
            success: false
        };
        this.captchaInstance = null;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.resetCaptcha = this.resetCaptcha.bind(this);
    }

    componentDidMount() {
        //clearValidation
        window.addEventListener('change', function(e){
            if(e.target.classList.contains('is-invalid')){
                e.target.classList.remove('is-invalid');
            }
        });
    }


    resetCaptcha(){
        this.captchaInstance.reset();
        this.setState({captcha: ''});
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.clearToasts();

        const {addToast} = this.props;
        const {setAccount} = this.props;

        if(this.state.username.length === 0){
            addToast(TOAST_ENUM['ERROR'], 'The username can not be empty.');
            document.getElementById('usernameLogin').classList.add('is-invalid');
        }

        if(this.state.password.length === 0){
            addToast(TOAST_ENUM['ERROR'], 'The password can not be empty.');
            document.getElementById('passwordLogin').classList.add('is-invalid');
        }

        if(this.state.captcha.length === 0){
            addToast(TOAST_ENUM['ERROR'], 'The captcha need to be completed.');
            this.resetCaptcha();
        }

        let invalids = document.getElementsByClassName('is-invalid');
        if(invalids.length === 0 && this.state.captcha.length !== 0){
            axios.post(API_URL + API_ROUTES['LOGIN'], {
                username: this.state.username,
                password: this.state.password,
                recaptcha: this.state.captcha
            }).then(response => {
                let data = response.data;

                switch(data.code) {
                    case 200:
                        addToast(TOAST_ENUM['SUCCESS'], 'Welcome back ' + this.state.username + ', you are now connected.');
                        setAccount(data.datas.username, data.datas.roles, data.datas.token);

                        localStorage.setItem(PREFIX_LOCALSTORE + 'token', data.datas.token);
                        localStorage.setItem(PREFIX_LOCALSTORE + 'tokenTimeout', data.datas.tokenValidity);

                        //redirect to Panel
                        this.setState({success: true});
                        break;
                    case 400:
                        if (data.errors.length !== 0) {
                            data.errors.forEach(function (error) {
                                addToast(TOAST_ENUM['ERROR'], error);
                            });
                        }
                        this.resetCaptcha();
                        break;
                    default:
                        this.resetCaptcha();
                        break;
                }
            });
        }

        //this.props.addToast(TOAST_ENUM['ERROR'], 'Wrong credentials.');
        //clear
    }

    render() {
        return(
            <form className="col-md-6 col-lg-5 d-block mx-auto" onSubmit={e => this.handleSubmit(e)} action={API_ROUTES['LOGIN']}>
                { this.state.success ? <Redirect to={APP_ROUTES['PANEL_HOME']} /> : null }
                <h2 className="text-center font-weight-bold">Login to your member area.</h2>

                <div className="form-group">
                    <label htmlFor="usernameLogin">Username:</label>
                    <input type="text" className="d-block form-control" required id="usernameLogin" onChange={e => this.setState({username: e.target.value})} value={this.state.username} placeholder="Username..."/>
                </div>

                <div className="form-group">
                    <label htmlFor="passwordLogin">Password:</label>
                    <input type="password" className="d-block form-control" required id="passwordLogin" onChange={e => this.setState({password: e.target.value})} value={this.state.password} placeholder="Password..."/>
                </div>

                <div className="text-center">
                    <Recaptcha sitekey={RECAPTCHA_KEY}
                               render="explicit"
                               hl={"en"}
                               onloadCallback={e => console.clear()}
                               ref={e => this.captchaInstance = e}
                               verifyCallback={e => this.setState({captcha: e})} />
                </div>


                <button type="submit" className="mt-5 d-block mx-auto btn btn-danger">Sign In</button>

                <p className="text-center small mt-2">You haven't acccount ? Go <Link className="link" to={APP_ROUTES['REGISTER']}>here</Link>.</p>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        addToast: (type, content) => {
            dispatch(addToast(type, content));
        },
        clearToasts: () =>{
            dispatch(clearToasts());
        },
        setAccount: (username, roles, token) =>{
            dispatch(setAccount(username, roles, token));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);