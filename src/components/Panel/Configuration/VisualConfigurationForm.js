import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faFillDrip,
    faHighlighter, faUserInjured,
    faVectorSquare
} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import {API_ROUTES, API_URL} from "../../../config/Config";
import {TOAST_ENUM} from "../../Toaster/ToastEnum";
import {VISUAL} from "./ConfigEnum";

class VisualConfigurationForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visualGlow: false,
            visualChams: false,
            visualESP: false,
            visualEnemyOnly: false,
            visualColorRedEnemy: 100,
            visualColorGreenEnemy: 50,
            visualColorBlueEnemy: 20,
            visualColorRedAlly: 20,
            visualColorGreenAlly: 100,
            visualColorBlueAlly: 20
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        const {account} = this.props;
        const {addToast} = this.props;
        axios.get(API_URL + API_ROUTES['GET_CONFIGURATION'] + VISUAL, {
            headers: {'Authorization': "bearer " + account.token}
        }).then((response) => {
            let data = response.data;

            switch(data.code){
                case 200:
                    if(data.config != null) {
                        this.setState({
                            visualGlow: data.config.glow,
                            visualChams: data.config.chams,
                            visualESP: data.config.esp,
                            visualEnemyOnly: data.config.enemy_only,
                            visualColorRedEnemy: data.config.color_red_enemy,
                            visualColorGreenEnemy: data.config.color_green_enemy,
                            visualColorBlueEnemy: data.config.color_blue_enemy,
                            visualColorRedAlly: data.config.color_red_ally,
                            visualColorGreenAlly: data.config.color_green_ally,
                            visualColorBlueAlly: data.config.color_blue_ally
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

        axios.post(API_URL + API_ROUTES['SAVE_CONFIGURATION'] + VISUAL, {
            glow: this.state.visualGlow,
            esp: this.state.visualESP,
            chams: this.state.visualChams,
            enemy_only: this.state.visualEnemyOnly,
            color_red_enemy: this.state.visualColorRedEnemy,
            color_green_enemy: this.state.visualColorGreenEnemy,
            color_blue_enemy: this.state.visualColorBlueEnemy,
            color_red_ally: this.state.visualColorRedAlly,
            color_green_ally: this.state.visualColorGreenAlly,
            color_blue_ally: this.state.visualColorBlueAlly
        }, {
            headers: {'Authorization': "bearer " + account.token},
        }).then((response) => {
            const data = response.data;

            switch(data.code){
                case 200:
                    addToast(TOAST_ENUM['SUCCESS'], "Your config for visual has been successfully saved.");
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
                                <p className="ml-1">Visual</p>
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
                                    <input className="form-check-input" type="checkbox" value={this.state.visualGlow} checked={this.state.visualGlow} onChange={e => this.setState({visualGlow: !this.state.visualGlow})} id="visualGlow"/>
                                    <label htmlFor="visualGlow"><FontAwesomeIcon icon={faHighlighter} /></label>
                                </div>
                                <small className="text-center d-block mt-1">Enable the glow</small>
                            </div>
                            <div className="form-group col-md-5">
                                <div className="text-center">
                                    <input className="form-check-input" type="checkbox" value={this.state.visualESP} checked={this.state.visualESP} onChange={e => this.setState({visualESP: !this.state.visualESP})} id="visualESP"/>
                                    <label htmlFor="visualESP"><FontAwesomeIcon icon={faVectorSquare} /></label>
                                </div>
                                <small className="text-center d-block mt-1">Enable the ESP (require windowed mode)</small>
                            </div>

                            <div className="form-group col-md-5">
                                <div className="text-center">
                                    <input className="form-check-input" type="checkbox" value={this.state.visualChams} checked={this.state.visualChams} onChange={e => this.setState({visualChams: !this.state.visualChams})} id="visualChams"/>
                                    <label htmlFor="visualChams"><FontAwesomeIcon icon={faFillDrip} /></label>
                                </div>
                                <small className="text-center d-block mt-1">Enable the character model color changer</small>
                            </div>

                            <div className="form-group col-md-5">
                                <div className="text-center">
                                    <input className="form-check-input" type="checkbox" value={this.state.visualEnemyOnly} checked={this.state.visualEnemyOnly} onChange={e => this.setState({visualEnemyOnly: !this.state.visualEnemyOnly})} id="visualEnemyOnly"/>
                                    <label htmlFor="visualEnemyOnly"><FontAwesomeIcon icon={faUserInjured} /></label>
                                </div>
                                <small className="text-center d-block mt-1">Apply visual only on enemy</small>
                            </div>
                        </div>

                        <div className="mt-5 form-row justify-content-around">
                            <div className="col-md-5">
                                <p>Color for enemy</p>
                                <div style={{backgroundColor: "rgb("+ this.state.visualColorRedEnemy +","+ this.state.visualColorGreenEnemy +","+ this.state.visualColorBlueEnemy +")"}} className="d-block mx-auto color-previewer"></div>

                                <div className="form-group">
                                    <label htmlFor="visualColorRedEnemy">Red</label>
                                    <input type="range" className="form-control-range" value={this.state.visualColorRedEnemy} min="1" max="250" onChange={e => this.setState({visualColorRedEnemy: e.target.value})} id="visualColorRedEnemy"/>
                                    <p className="range-text mb-0">{this.state.visualColorRedEnemy}/250</p>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="visualColorGreenEnemy">Green</label>
                                    <input type="range" className="form-control-range" value={this.state.visualColorGreenEnemy} min="1" max="250" onChange={e => this.setState({visualColorGreenEnemy: e.target.value})} id="visualColorGreenEnemy"/>
                                    <p className="range-text mb-0">{this.state.visualColorGreenEnemy}/250</p>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="visualColorBlueEnemy">Blue</label>
                                    <input type="range" className="form-control-range" value={this.state.visualColorBlueEnemy} min="1" max="250" onChange={e => this.setState({visualColorBlueEnemy: e.target.value})} id="visualColorBlueEnemy"/>
                                    <p className="range-text mb-0">{this.state.visualColorBlueEnemy}/250</p>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <p>Color for ally</p>
                                <div style={{backgroundColor: "rgb("+ this.state.visualColorRedAlly +","+ this.state.visualColorGreenAlly +","+ this.state.visualColorBlueAlly +")"}} className="d-block mx-auto color-previewer"></div>

                                <div className="form-group">
                                    <label htmlFor="visualColorRedAlly">Red</label>
                                    <input type="range" className="form-control-range" value={this.state.visualColorRedAlly} min="1" max="250" onChange={e => this.setState({visualColorRedAlly: e.target.value})} id="visualColorRedAlly"/>
                                    <p className="range-text mb-0">{this.state.visualColorRedAlly}/250</p>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="visualColorGreenAlly">Green</label>
                                    <input type="range" className="form-control-range" value={this.state.visualColorGreenAlly} min="1" max="250" onChange={e => this.setState({visualColorGreenAlly: e.target.value})} id="visualColorGreenAlly"/>
                                    <p className="range-text mb-0">{this.state.visualColorGreenAlly}/250</p>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="visualColorBleueAlly">Blue</label>
                                    <input type="range" className="form-control-range" value={this.state.visualColorBlueAlly} min="1" max="250" onChange={e => this.setState({visualColorBlueAlly: e.target.value})} id="visualColorBlueAlly"/>
                                    <p className="range-text mb-0">{this.state.visualColorBlueAlly}/250</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

export default VisualConfigurationForm;