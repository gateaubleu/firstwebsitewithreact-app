import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from 'axios';
import {API_ROUTES, API_URL} from "../../../config/Config";
import {TOAST_ENUM} from "../../Toaster/ToastEnum";
import {TRIGGERBOT} from "./ConfigEnum";

class TriggerbotConfigurationForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            triggerKey: '',
            triggerMinDelay: 1,
            triggerMaxDelay: 5
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        const {account} = this.props;
        const {addToast} = this.props;
        axios.get(API_URL + API_ROUTES['GET_CONFIGURATION'] + TRIGGERBOT, {
            headers: {'Authorization': "bearer " + account.token}
        }).then((response) => {
            let data = response.data;

            switch(data.code){
                case 200:
                    if(data.config != null){
                        this.setState({
                            triggerKey: data.config.activation_key,
                            triggerMinDelay: data.config.min_delay,
                            triggerMaxDelay: data.config.max_delay
                        });
                    }
                    break;
                case 401:
                    addToast(TOAST_ENUM['ERROR'], data.errors[0]);
                    break;
                default:
                    break;
            }
        });
    }

    onSubmit(e){
        e.preventDefault();

        const {addToast} = this.props;
        const {account} = this.props;

        axios.post(API_URL + API_ROUTES['SAVE_CONFIGURATION'] + TRIGGERBOT, {
            activation_key: this.state.triggerKey,
            min_delay: this.state.triggerMinDelay,
            max_delay: this.state.triggerMaxDelay
        }, {
            headers: {'Authorization': "bearer " + account.token},
        }).then((response) => {
            const data = response.data;

            switch(data.code){
                case 200:
                    addToast(TOAST_ENUM['SUCCESS'], "Your config for triggerbot has been sucessfully saved.");

                    break;
                case 400:
                    if(data.errors.length !== 0){
                        data.errors.map(error => addToast(TOAST_ENUM['ERROR'], error));
                    }
                    else{
                        addToast(TOAST_ENUM['ERROR'], 'Please refresh the page or contact support team.');
                    }
                    break;
                case 401:
                    if(data.errors.length !== 0){
                        data.errors.map(error => addToast(TOAST_ENUM['ERROR'], error));
                    }
                    else{
                        addToast(TOAST_ENUM['ERROR'], 'Please refresh the page or contact support team.');
                    }
                    break;
                default:
                    break;
            }
        });

    }

    render(){
        const {saveIcon} = this.props;

        return(
            <form className="position-relative" onSubmit={e => this.onSubmit(e)} action="">
                <div className="card">
                    <div className="card-header">
                        <div className="position-relative">
                            <div className="text-center">
                                <p className="ml-1">Triggerbot</p>
                            </div>
                            <div style={{right: '20px', top: '0px'}} className="position-absolute">
                                <button type="submit" className="btn btn-xs btn-danger d-block text-right mr-2" href=""><FontAwesomeIcon icon={saveIcon}/></button>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="form-row justify-content-around">
                            <div className="form-group col-md-5">
                                <label htmlFor="triggerKey">Key (<a className="text-blue" rel="noopener noreferrer" target="_blank" href="http://nehe.gamedev.net/article/msdn_virtualkey_codes/15009/">see</a>)</label>
                                <input type="text" className="form-control" value={this.state.triggerKey} onChange={e => this.setState({triggerKey: e.target.value})} id="triggerKey" />
                                <small className="text-center d-block mt-1">Number that represents the key on which to stay press for the triggerbot work</small>
                            </div>
                        </div>
                        <div className="form-row justify-content-around">
                            <div className="form-group col-md-5">
                                <label htmlFor="triggerMinDelay">Min Delay</label>
                                <input type="range" className="form-control-range" value={this.state.triggerMinDelay} min="1" max="400" onChange={e => {
                                    this.setState({triggerMinDelay: e.target.value});

                                    if(parseInt(this.state.triggerMinDelay) >= parseInt(this.state.triggerMaxDelay)){
                                        this.setState({triggerMaxDelay: parseInt(this.state.triggerMinDelay) + 10})
                                    }

                                }} id="triggerMinDelay"/>
                                <p className="range-text mb-0">{this.state.triggerMinDelay}/400</p>
                                <small className="text-center d-block mt-1">Represent the minimum delay before every shots</small>
                            </div>
                            <div className="form-group col-md-5">
                                <label htmlFor="triggerMaxDelay">Max Delay</label>
                                <input type="range" className="form-control-range" value={this.state.triggerMaxDelay} min={this.state.triggerMinDelay} max="800" onChange={e => this.setState({triggerMaxDelay: e.target.value})} id="triggerMaxDelay"/>
                                <p className="range-text mb-0">{this.state.triggerMaxDelay}/800</p>
                                <small className="text-center d-block mt-1">Represent the maximum delay before every shots</small>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

export default TriggerbotConfigurationForm;