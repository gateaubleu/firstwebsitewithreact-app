import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSprayCan} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import {API_ROUTES, API_URL} from "../../../config/Config";
import {TOAST_ENUM} from "../../Toaster/ToastEnum";

class AimbotConfigurationForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            aimKey: '',
            aimBones: 8,
            aimFovX: 1,
            aimFovY: 1,
            aimSmoothX: 1,
            aimSmoothY: 1,
            aimRcs: false,
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        const {account} = this.props;
        axios.get(API_URL + API_ROUTES['GET_CONFIGURATION_AIMBOT'], {
            headers: {'Authorization': "bearer " + account.token}
        }).then((response) => {
            let data = response.data;

            switch(data.code){
                case 200:
                    this.setState({
                        aimKey: data.aimbot.activation_key,
                        aimBones: data.aimbot.bones,
                        aimFovX: data.aimbot.fov_x,
                        aimFovY: data.aimbot.fov_y,
                        aimSmoothX: data.aimbot.smooth_x,
                        aimSmoothY: data.aimbot.smooth_y,
                        aimRcs: data.aimbot.spray_control
                    });
                    break;
                case 401:
                    break;
            }
        });
    }

    onSubmit(e){
        e.preventDefault();

        const {addToast} = this.props;
        const {account} = this.props;

        axios.post(API_URL + API_ROUTES['SAVE_CONFIGURATION_AIMBOT'], {
            activation_key: this.state.aimKey,
            bones: this.state.aimBones,
            fov_x: this.state.aimFovX,
            fov_y: this.state.aimFovY,
            smooth_x: this.state.aimSmoothX,
            smooth_y: this.state.aimSmoothY,
            spray_control : this.state.aimRcs
        }, {
            headers: {'Authorization': "bearer " + account.token},
        }).then((response) => {
            const data = response.data;

            switch(data.code){
                case 200:
                    addToast(TOAST_ENUM['SUCCESS'], "Your config for aimbot has been sucessfully saved.");

                    // redirect to download area
                    setTimeout(() => this.setState({success: data.success}), 1000);
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
                                <p className="ml-1">Aimbot</p>
                            </div>
                            <div style={{right: '20px', top: '0px'}} className="position-absolute">
                                <button type="submit" className="btn btn-xs btn-danger d-block text-right mr-2" href=""><FontAwesomeIcon icon={saveIcon}/></button>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="form-row justify-content-around">
                            <div className="form-group col-md-5">
                                <label htmlFor="aimKey">Key (<a className="text-blue" rel="noopener noreferrer" target="_blank" href="http://nehe.gamedev.net/article/msdn_virtualkey_codes/15009/">see</a>)</label>
                                <input type="text" className="form-control" value={this.state.aimKey} onChange={e => this.setState({aimKey: e.target.value})} id="aimKey" />
                                <small className="text-center d-block mt-1">Number that represents the key on which to stay press for the aimbot to work</small>
                            </div>
                            <div className="form-group col-md-5">
                                <label htmlFor="aimBones">Bones</label>
                                <select className="form-control" value={this.state.aimBones} onChange={e => this.setState({aimBones: e.target.value})} id="aimBones">
                                    <option value="8">Head</option>
                                    <option value="7">Chest</option>
                                </select>
                                <small className="text-center d-block mt-1">L'endroit ou l'aimbot va être attirer</small>
                            </div>
                        </div>

                        <div className="form-row justify-content-around">
                            <div className="form-group col-md-5">
                                <label htmlFor="aimFovX">Fov X</label>
                                <input type="range" className="form-control-range" value={this.state.aimFovX} min="1" max="50" onChange={e => this.setState({aimFovX: e.target.value})} id="aimFovX"/>
                                <p className="mb-0">{this.state.aimFovX}/50</p>
                                <small className="text-center d-block mt-1">Represents the area where the aimbot is effective on the horizontal axis</small>
                            </div>
                            <div className="form-group col-md-5">
                                <label htmlFor="aimFovY">Fov Y</label>
                                <input type="range" className="form-control-range" value={this.state.aimFovY} min="1" max="50" onChange={e => this.setState({aimFovY: e.target.value})} id="aimFovY"/>
                                <p className="mb-0">{this.state.aimFovY}/50</p>
                                <small className="text-center d-block mt-1">Represents the area where the aimbot is effective on the vertical axis</small>
                            </div>
                        </div>

                        <div className="form-row justify-content-around">
                            <div className="form-group col-md-5">
                                <label htmlFor="aimSmoothX">Smooth X</label>
                                <input type="range" className="form-control-range" value={this.state.aimSmoothX} min="1" max="100" onChange={e => this.setState({aimSmoothX: e.target.value})} id="aimSmoothX"/>
                                <p className="mb-0">{this.state.aimSmoothX}/100</p>
                                <small className="text-center d-block mt-1">Decreases the aggressivity of the aimbot on the horizontal axis</small>
                            </div>
                            <div className="form-group col-md-5">
                                <label htmlFor="aimSmoothY">Smooth Y</label>
                                <input type="range" className="form-control-range" value={this.state.aimSmoothY} min="1" max="100" onChange={e => this.setState({aimSmoothY: e.target.value})} id="aimSmoothY"/>
                                <p className="mb-0">{this.state.aimSmoothY}/100</p>
                                <small className="text-center d-block mt-1">Decreases the aggressivity of the aimbot on the vertical axis</small>
                            </div>
                        </div>

                        <div className="form-row justify-content-around mt-3">
                            <div className="form-group col-md-5">
                                <div className="text-center">
                                    <input className="form-check-input" type="checkbox" value={this.state.aimRcs} checked={this.state.aimRcs ? 'checked' : null} onChange={e => this.setState({aimRcs: !this.state.aimRcs})} id="aimRcs"/>
                                    <label htmlFor="aimRcs"><FontAwesomeIcon icon={faSprayCan} /></label>
                                </div>
                                <small className="text-center d-block mt-1">Enable this to compensate the weapon spray</small>
                            </div>
                        </div>

                    </div>
                </div>
            </form>
        );
    }
}

export default AimbotConfigurationForm;