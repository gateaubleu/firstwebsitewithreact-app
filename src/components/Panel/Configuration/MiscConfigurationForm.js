import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from 'axios';
import {API_ROUTES, API_URL} from "../../../config/Config";
import {TOAST_ENUM} from "../../Toaster/ToastEnum";
import {MISC} from "./ConfigEnum";
import {faMapMarkedAlt, faSprayCan, faVolumeUp} from "@fortawesome/free-solid-svg-icons";

class MiscConfigurationForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            miscRadar: false,
            miscRcs: false,
            miscRcsSensitivity: 1.40,
            miscRcsForceX: 50,
            miscRcsForceY: 50,
            miscSonar: false,
            miscSonarFov: 1,
            miscSonarFrequency: 80,
            miscSonarDuration: 80,
            miscSonarInterval: 100
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        const {account} = this.props;
        const {addToast} = this.props;
        axios.get(API_URL + API_ROUTES['GET_CONFIGURATION'] + MISC, {
            headers: {'Authorization': "bearer " + account.token}
        }).then((response) => {
            let data = response.data;

            switch(data.code){
                case 200:
                    if(data.config != null) {
                        this.setState({
                            miscRadar: data.config.radar,
                            miscRcs: data.config.standalone_spray,
                            miscRcsSensitivity: data.config.spray_sensitivity,
                            miscRcsForceX: data.config.spray_force_x,
                            miscRcsForceY: data.config.spray_force_y,
                            miscSonar: data.config.sound_esp,
                            miscSonarFov: data.config.sound_fov,
                            miscSonarFrequency: data.config.sound_duration,
                            miscSonarDuration: data.config.sound_frequency,
                            miscSonarInterval: data.config.sound_interval
                        });
                    }
                    break;
                case 401:
                    addToast(TOAST_ENUM['ERROR'], data.errors[0]);
                    break;
            }
        });
    }

    onSubmit(e){
        e.preventDefault();

        const {addToast} = this.props;
        const {account} = this.props;

        axios.post(API_URL + API_ROUTES['SAVE_CONFIGURATION'] + MISC, {
            radar: this.state.miscRadar,
            standalone_spray: this.state.miscRcs,
            spray_sensitivity: this.state.miscRcsSensitivity,
            spray_force_x: this.state.miscRcsForceX,
            spray_force_y: this.state.miscRcsForceY,
            sound_esp: this.state.miscSonar,
            sound_fov: this.state.miscSonarFov,
            sound_duration: this.state.miscSonarDuration,
            sound_frequency: this.state.miscSonarFrequency,
            sound_interval: this.state.miscSonarInterval
        }, {
            headers: {'Authorization': "bearer " + account.token},
        }).then((response) => {
            const data = response.data;

            switch(data.code){
                case 200:
                    addToast(TOAST_ENUM['SUCCESS'], "Your config for misc has been sucessfully saved.");
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
                                <p className="ml-1">Misc</p>
                            </div>
                            <div style={{right: '20px', top: '0px'}} className="position-absolute">
                                <button type="submit" className="btn btn-xs btn-danger d-block text-right mr-2" href=""><FontAwesomeIcon icon={saveIcon}/></button>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="form-row justify-content-around">
                            <div className="form-group col-md-5">
                                <div className="text-center">
                                    <input className="form-check-input" type="checkbox" value={this.state.miscRadar} checked={this.state.miscRadar} onChange={e => this.setState({miscRadar: !this.state.miscRadar})} id="miscRadar"/>
                                    <label htmlFor="miscRadar"><FontAwesomeIcon icon={faMapMarkedAlt} /></label>
                                </div>
                                <small className="text-center d-block mt-1">Enable the radar hack</small>
                            </div>
                        </div>

                        <hr/>

                        <div className="form-row justify-content-around">
                            <div className="form-group col-md-5">
                                <div className="text-center">
                                    <input className="form-check-input" type="checkbox" value={this.state.miscRcs} checked={this.state.miscRcs} onChange={e => this.setState({miscRcs: !this.state.miscRcs})} id="miscRcs"/>
                                    <label htmlFor="miscRcs"><FontAwesomeIcon icon={faSprayCan} /></label>
                                </div>
                                <small className="text-center d-block mt-1">Enable the standalone rcs</small>
                            </div>
                        </div>

                        <div className="form-row justify-content-around">
                            <div className="form-group col-md-10">
                                <label htmlFor="miscRcsSensitivity">Sensitivity</label>
                                <input type="range" className="form-control-range" value={this.state.miscRcsSensitivity} step="0.01" min="0.20" max="5.00" onChange={e => this.setState({miscRcsSensitivity: e.target.value})} id="miscRcsSensitivity"/>
                                <p className="range-text mb-0">{this.state.miscRcsSensitivity}/5.0</p>
                                <small className="text-center d-block mt-1">Represent your in game sensitivity</small>
                            </div>
                            <div className="form-group col-md-5">
                                <label htmlFor="miscRcsForceX">Force X</label>
                                <input type="range" className="form-control-range" value={this.state.miscRcsForceX} step="0.10" min="1" max="100" onChange={e => this.setState({miscRcsForceX: e.target.value})} id="miscRcsForceX"/>
                                <p className="range-text mb-0">{this.state.miscRcsForceX}/100</p>
                                <small className="text-center d-block mt-1">Decrease the force of the recoil on the horizontal axis</small>
                            </div>
                            <div className="form-group col-md-5">
                                <label htmlFor="miscRcsForceY">Force Y</label>
                                <input type="range" className="form-control-range" value={this.state.miscRcsForceY} step="0.10" min="1" max="100" onChange={e => this.setState({miscRcsForceY: e.target.value})} id="miscRcsForceY"/>
                                <p className="range-text mb-0">{this.state.miscRcsForceY}/100</p>
                                <small className="text-center d-block mt-1">Decrease the force of the recoil on the vertical axis</small>
                            </div>
                        </div>


                        <hr/>

                        <div className="form-row justify-content-around">
                            <div className="form-group col-md-5">
                                <div className="text-center">
                                    <input className="form-check-input" type="checkbox" value={this.state.miscSonar} checked={this.state.miscSonar} onChange={e => this.setState({miscSonar: !this.state.miscSonar})} id="miscSonar"/>
                                    <label htmlFor="miscSonar"><FontAwesomeIcon icon={faVolumeUp} /></label>
                                </div>
                                <small className="text-center d-block mt-1">Enable this to ear a beep when aiming on ennemies through walls</small>
                            </div>
                        </div>

                        <div className="form-row justify-content-around">
                            <div className="form-group col-md-10">
                                <label htmlFor="miscSonarFov">Fov</label>
                                <input type="range" className="form-control-range" value={this.state.miscSonarFov} min="1" max="15" onChange={e => this.setState({miscSonarFov: e.target.value})} id="miscSonarFov"/>
                                <p className="range-text mb-0">{this.state.miscSonarFov}/15</p>
                                <small className="text-center d-block mt-1">Represent the area in pixel when sound esp work</small>
                            </div>
                            <div className="form-group col-md-5">
                                <label htmlFor="miscSonarDuration">Beep Duration</label>
                                <input type="range" className="form-control-range" value={this.state.miscSonarDuration} min="80" max="500" onChange={e => this.setState({miscSonarDuration: e.target.value})} id="miscSonarDuration"/>
                                <p className="range-text mb-0">{this.state.miscSonarDuration}/500</p>
                                <small className="text-center d-block mt-1">Represent the duration for the beep sound</small>
                            </div>
                            <div className="form-group col-md-5">
                                <label htmlFor="miscSonarFrequency">Beep Frequency</label>
                                <input type="range" className="form-control-range" value={this.state.miscSonarFrequency} min="80" max="500" onChange={e => this.setState({miscSonarFrequency: e.target.value})} id="miscSonarFrequency"/>
                                <p className="range-text mb-0">{this.state.miscSonarFrequency}/500</p>
                                <small className="text-center d-block mt-1">Represent the frequency for the beep sound</small>
                            </div>

                            <div className="form-group col-md-5">
                                <label htmlFor="miscSonarInterval">Interval Between Beep</label>
                                <input type="range" className="form-control-range" value={this.state.miscSonarInterval} min="10" max="350" onChange={e => this.setState({miscSonarInterval: e.target.value})} id="miscSonarInterval"/>
                                <p className="range-text mb-0">{this.state.miscSonarInterval}/350</p>
                                <small className="text-center d-block mt-1">Represent time in micro seconds between each beep</small>
                            </div>
                        </div>


                    </div>
                </div>
            </form>
        );
    }
}

export default MiscConfigurationForm;