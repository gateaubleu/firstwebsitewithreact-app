import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSprayCan} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import {API_ROUTES, API_URL} from "../../../config/Config";
import {TOAST_ENUM} from "../../Toaster/ToastEnum";

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
            visualColorBleueEnemy: 20,
            visualColorRedAlly: 20,
            visualColorGreenAlly: 100,
            visualColorBleueAlly: 20
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        const {account} = this.props;
        const {addToast} = this.props;
        axios.get(API_URL + API_ROUTES['GET_CONFIGURATION_AIMBOT'], {
            headers: {'Authorization': "bearer " + account.token}
        }).then((response) => {
            let data = response.data;

            switch(data.code){
                case 200:
                    this.setState({

                    });
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

        axios.post(API_URL + API_ROUTES['SAVE_CONFIGURATION_AIMBOT'], {

        }, {
            headers: {'Authorization': "bearer " + account.token},
        }).then((response) => {
            const data = response.data;

            switch(data.code){
                case 200:
                    addToast(TOAST_ENUM['SUCCESS'], "Your config for visual has been sucessfully saved.");

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
                                <p className="ml-1">Visual</p>
                            </div>
                            <div style={{right: '20px', top: '0px'}} className="position-absolute">
                                <button type="submit" className="btn btn-xs btn-danger d-block text-right mr-2" href=""><FontAwesomeIcon icon={saveIcon}/></button>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="form-row justify-content-around">

                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

export default VisualConfigurationForm;