import React from 'react';
import Recaptcha from "react-recaptcha";
import {API_ROUTES, API_URL, RECAPTCHA_KEY} from "../../../config/Config";
import {addToast} from "../../../reducers/actions/ToastActions";
import {connect} from "react-redux";
import {TOAST_ENUM} from "../../Toaster/ToastEnum";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from "axios";
import {faDownload} from "@fortawesome/free-solid-svg-icons";
import FileDownload from "js-file-download";
import uniqid from "uniqid";

class HardwareRegisterForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            hwid: '',
            captcha: ''
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

        let errors = [];

        if(this.state.hwid.length === 0){
            errors.push('The hardware need to be completed.');
            //addToast(TOAST_ENUM['ERROR'], 'The hardware need to be completed.');
        }

        if(this.state.captcha.length === 0){
            errors.push('The captcha need to be completed.');
            //addToast(TOAST_ENUM['ERROR'], 'The captcha need to be completed.');
            this.resetCaptcha();
        }

        if(errors.length === 0){
            axios.post(API_URL + API_ROUTES['SET_HARDWARE_ID'], {
                hwid: this.state.hwid,
                recaptcha: this.state.captcha
            }, {
                headers: {'Authorization': "bearer " + account.token},
            }).then((response) => {
                const data = response.data;

                switch(data.code){
                    case 200:
                        addToast(TOAST_ENUM['SUCCESS'], "Your hardware id has been successfully registered !");
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
        else{
            errors.forEach(error => addToast(TOAST_ENUM['ERROR'], error));
        }
    }

    onDownloadTool(e){
        e.preventDefault();

        const {account} = this.props;

        axios.get(API_URL + API_ROUTES['GET_HARDWARE_TOOL'], {
            headers: {'Authorization': "bearer " + account.token},
        }).then((response) => {
            const data = response.data;

            switch(data.code){
                case 202:
                    let build = new Buffer(data.build, 'base64');
                    FileDownload(build, "TakeMyHwid.exe");
                    break;
                case 401:
                    if(data.errors.length !== 0){
                        data.errors.map(error => addToast(TOAST_ENUM['ERROR'], error));
                    }
                    else{
                        addToast(TOAST_ENUM['ERROR'], 'Please refresh the page.');
                    }
                    break;
                default:
                    break;
            }
        });

    }

    render(){
        return(
            <div className="col-10 mb-5">
                <div className="card">
                    <div className="card-header text-center">
                        Hardware ID
                    </div>
                    <div className="card-body">
                        <p className="text-center">The purpose of an hardware id is to secure and limit the usage of the cheat to only 1 computer, it block any sharing attempts and secure your build from being used by someone else.</p>

                        <form className="mb-3 mt-3" onSubmit={e => this.onDownloadTool(e)} action="">
                            <button type="submit" className="btn btn-dark d-block mx-auto"><FontAwesomeIcon icon={faDownload} /> Download the tool</button>
                        </form>

                        <form onSubmit={e => this.onSubmit(e)} action="">
                            <div className="form">
                                <div className="form-group w-50 d-block mx-auto">
                                    <label htmlFor="">Harware ID:</label>
                                    <input type="text" className="form-control"
                                           placeholder="1111B-4545-D4564-D4564"
                                           value={this.state.hwid}
                                           onChange={e => this.setState({hwid: e.target.value})}/>
                                </div>

                                <div className="text-center">
                                    <Recaptcha sitekey={RECAPTCHA_KEY}
                                               render="explicit"
                                               hl={"en"}
                                               onloadCallback={e => console.clear()}
                                               ref={e => this.captchaInstance = e}
                                               verifyCallback={e => this.setState({captcha: e})}/>
                                </div>

                                <button className="mt-2 d-block mx-auto btn btn-danger" type="submit">Register</button>

                                <small className="d-block mt-3 text-center">For hwid reset, please join our Discord and private message Ten or 7Pho.</small>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HardwareRegisterForm);