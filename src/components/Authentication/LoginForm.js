import React from 'react';
import {API_ROUTES, RECAPTCHA_KEY} from "../../config/Config";
import {connect} from "react-redux";
import {addToast, clearToasts} from "../../reducers/actions/ToastActions";
import {TOAST_ENUM} from "../Toaster/ToastEnum";
import Recaptcha from "react-recaptcha";

class LoginForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            captcha: '',
        };
        this.captchaInstance = null;
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.clearToasts();

        this.props.addToast(TOAST_ENUM['ERROR'], 'Wrong credentials.');
        //clear
    }

    render() {
        return(
            <form className="col-md-6 col-lg-5 d-block mx-auto" onSubmit={e => this.handleSubmit(e)} action={API_ROUTES['LOGIN']}>

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
                    <Recaptcha sitekey={RECAPTCHA_KEY} ref={e => this.captchaInstance = e} verifyCallback={e => this.setState({captcha: e})} />
                </div>


                <button type="submit" className="mt-5 d-block mx-auto btn btn-danger">Sign In</button>
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
            dispatch(addToast(type, content))
        },
        clearToasts: () =>{
            dispatch(clearToasts());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);