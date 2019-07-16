import React from 'react';
import {connect} from "react-redux";
import {addToast, clearToasts} from "../../reducers/actions/ToastActions";
import {TOAST_ENUM} from "../Toaster/ToastEnum";
import Recaptcha from 'react-recaptcha';
import {RECAPTCHA_KEY} from "../../config/Config";

class RegisterForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            repassword: '',
            captcha: '',
            maxUsernameLength: 20,
            minUsernameLength:5,
            maxPasswordLength: 30,
            minPasswordLength: 5
        };

        this.captchaInstance = null;
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        //clearValidation
        window.addEventListener('change', function(e){
            if(e.target.classList.contains('is-invalid')){
                e.target.classList.remove('is-invalid');
            }
        });
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.clearToasts();

        if(this.state.username.length < this.state.minUsernameLength){
            this.props.addToast(TOAST_ENUM['ERROR'], 'The username must contain a minimum of '+ this.state.minUsernameLength +' characters.');
            document.getElementById('usernameRegister').classList.add('is-invalid');
        }
        else if(this.state.username.length > this.state.maxUsernameLength){
            this.props.addToast(TOAST_ENUM['ERROR'], 'The username can not contain more than '+ this.state.maxUsernameLength +' characters');
            document.getElementById('usernameRegister').classList.add('is-invalid');
        }

        if(this.state.password.length < this.state.minPasswordLength){
            this.props.addToast(TOAST_ENUM['ERROR'], 'The password must contain a minimum of '+ this.state.minPasswordLength +' characters.');
            document.getElementById('passwordRegister').classList.add('is-invalid');
        }
        else if(this.state.password.length > this.state.maxPasswordLength){
            this.props.addToast(TOAST_ENUM['ERROR'], 'The password can not contain more than '+ this.state.maxPasswordLength +' characters');
            document.getElementById('passwordRegister').classList.add('is-invalid');
        }

        if(this.state.password !== this.state.repassword){
            this.props.addToast(TOAST_ENUM['ERROR'], 'The password need to be a same value.');
            document.getElementById('rePasswordRegister').classList.add('is-invalid');
        }

        if(this.state.captcha.length === 0){
            this.props.addToast(TOAST_ENUM['ERROR'], 'The captcha need to be completed.');
        }

        let invalids = document.getElementsByClassName('is-invalid');
        if(invalids.length === 0 && this.state.captcha.length !== 0){

            //reset captcha:
            this.captchaInstance.reset();
            this.setState({captcha: ''});
        }
    }

    render(){
        return(
            <form className="col-md-6 col-lg-5 d-block mx-auto" onSubmit={e => this.handleSubmit(e)}>
                <h2 className="text-center font-weight-bold">Join the community of TakeUrBalls</h2>

                <div className="form-group">
                    <label htmlFor="usernameRegister">Username:</label>
                    <input type="text" className="d-block form-control" id="usernameRegister" required onChange={e => this.setState({username: e.target.value})} value={this.state.username}/>
                    <small>Username must be between {this.state.minUsernameLength} and {this.state.maxUsernameLength} characters.</small>
                </div>

                <div className="form-group">
                    <label htmlFor="passwordRegister">Password:</label>
                    <input type="password" className="d-block form-control" id="passwordRegister" required onChange={e => this.setState({password: e.target.value})} value={this.state.password}/>
                    <small>Password must be between {this.state.minPasswordLength} and {this.state.maxPasswordLength} characters.</small>
                </div>

                <div className="form-group">
                    <label htmlFor="rePasswordRegister">Repeat password:</label>
                    <input type="password" className="d-block form-control" id="rePasswordRegister" required onChange={e => this.setState({repassword: e.target.value})} value={this.state.repassword}/>
                </div>

                <div className="text-center">
                    <Recaptcha sitekey={RECAPTCHA_KEY} ref={e => this.captchaInstance = e} verifyCallback={e => this.setState({captcha: e})} />
                </div>

                <button type="submit" className="mt-5 d-block mx-auto btn btn-danger">Sign Up</button>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        toasts: state.toasts
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addToast: (type, content) => {
            dispatch(addToast(type, content))
        },
        clearToasts: () => {
            dispatch(clearToasts());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);