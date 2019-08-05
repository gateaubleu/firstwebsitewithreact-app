import React from 'react';
import Recaptcha from "react-recaptcha";
import {Link, Redirect} from 'react-router-dom';
import {API_ROUTES, API_URL, APP_ROUTES, RECAPTCHA_KEY} from "../../../config/Config";
import {TOAST_ENUM} from "../../Toaster/ToastEnum";
import {connect} from "react-redux";
import {addToast} from "../../../reducers/actions/ToastActions";
import axios from 'axios';

class SubscriptionActivationForm extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            activationCode: '',
            captcha: '',
            success: false
        };

        this.captchaInstance = null;
        this.onSubmit = this.onSubmit.bind(this);
    }

    resetCaptcha(){
        this.captchaInstance.reset();
        this.setState({captcha: ''});
        console.clear();
    }

    onSubmit(e){
        e.preventDefault();

        const {addToast} = this.props;
        const {account} = this.props;

        if(this.state.captcha.length === 0){
            addToast(TOAST_ENUM['ERROR'], 'The captcha need to be completed.');
            this.resetCaptcha();
        }

        if(this.state.captcha.length !== 0){
            axios.post(API_URL + API_ROUTES['SUBSCRIPTION_ACTIVATION'], {
                token: this.state.activationCode,
                recaptcha: this.state.captcha
            }, {
                headers: {'Authorization': "bearer " + account.token},
            }).then((response) => {
                const data = response.data;

                switch(data.code){
                    case 200:
                        addToast(TOAST_ENUM['SUCCESS'], "Your subscription has been activated sucessfuly ! You can now download your build.");
                        addToast(TOAST_ENUM['INFO'], "Don't forget to set your hardware id on Account Management.");
                        break;
                    case 400:
                        if(data.errors.length !== 0){
                            data.errors.map(error => addToast(TOAST_ENUM['ERROR'], error));
                        }
                        else{
                            addToast(TOAST_ENUM['ERROR'], 'Please refresh the page.');
                        }

                        this.resetCaptcha();
                        break;
                    default:
                        this.resetCaptcha();
                        break;
                }
            });
        }
    }

    render(){
        return(
            <form style={{padding: '10px'}} action="" onSubmit={e => this.onSubmit(e)}>
                <div className="form-group w-50 d-block mx-auto">
                    <label htmlFor="">Code:</label>
                    <input type="text" className="form-control" placeholder="Code activation" onChange={e => this.setState({activationCode: e.target.value})}/>
                </div>

                <div className="text-center">
                    <Recaptcha sitekey={RECAPTCHA_KEY}
                               render="explicit"
                               hl={"en"}
                               onloadCallback={e => console.clear()}
                               ref={e => this.captchaInstance = e}
                               verifyCallback={e => this.setState({captcha: e})} />
                </div>

                <button className="mt-2 d-block mx-auto btn btn-danger" type="submit">Activate</button>
                <p className="text-center small mt-2">After you need to go <Link className="link" to={APP_ROUTES['PANEL_USER_COG']}>here</Link>, for register your hardware id.</p>
            </form>
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
            dispatch(addToast(type, content));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionActivationForm);