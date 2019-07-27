import React from 'react';
import Breadcrumb from "../Breadcrumb";
import freeBuild from '../../../assets/img/free-build.jpg';
import premiumBuild from '../../../assets/img/premium-build.jpg';
import {Link} from "react-router-dom";
import {API_ROUTES, API_URL, APP_ROUTES} from "../../../config/Config";
import axios from 'axios';
import FileDownload from 'js-file-download';
import {connect} from "react-redux";
import {addToast} from "../../../reducers/actions/ToastActions";
import {TOAST_ENUM} from "../../Toaster/ToastEnum";
import uniqid from 'uniqid';

class DownloadPage extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            account: props.account
        };

        this.onDownloadBuild = this.onDownloadBuild.bind(this);
    }

    onDownloadBuild(e, type){
        e.preventDefault();

        const {addToast} = this.props;

        axios.get(API_URL + API_ROUTES['DOWNLOAD_BUILD'] + type, {
            headers: {'Authorization': "bearer " + this.state.account.token},
        }).then((response) => {
            const data = response.data;

            switch(data.code){
                case 202:
                    let build = new Buffer(data.build, 'base64');
                    FileDownload(build, uniqid()+".rar");
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

    render() {
        const {account} = this.props;

        let premium = false;
        if (account.length !== 0 && account.roles.indexOf("ROLE_CUSTOMER") !== -1) {
            premium = true;
        }

        return (
            <div id="download">
                <Breadcrumb title="Download build"/>
                <div className="row justify-content-around">
                    <div className="col-md-5 col-10 mb-5">
                        <div className="card">
                            <div className="card-header text-center">
                                Premium build
                            </div>
                            <div className="card-body">
                                <img className="d-block mx-auto w-100" src={premiumBuild} alt=""/>
                            </div>

                            <div className="features-list">
                                <p>Aimbot:</p>
                                <ul className="flex-column">
                                    <li>Key</li>
                                    <li>Fov</li>
                                    <li>Smooth</li>
                                    <li>Bones</li>
                                    <li>Recoil compensation</li>
                                </ul>

                                <p>Triggerbot:</p>
                                <ul className="flex-column">
                                    <li>Key</li>
                                    <li>Delay between shots</li>
                                </ul>

                                <p>Visual:</p>
                                <ul className="flex-column">
                                    <li>Glow</li>
                                    <li>Enemy Color</li>
                                    <li>Ally Color</li>
                                    <li>Box 2D ESP</li>
                                    <li>Distance ESP</li>
                                </ul>

                                <p>Misc:</p>
                                <ul className="flex-column">
                                    <li>SoundESP</li>
                                    <li>Radar Hack</li>
                                    <li>Standalone recoil compensation</li>
                                </ul>
                            </div>

                            <Link to="" onClick={e => this.onDownloadBuild(e, "premium")} className={account && premium ? "btn btn-dark" : "btn btn-dark disabled"}>Download</Link>
                        </div>
                        {!premium ?
                            <Link to={APP_ROUTES['PANEL_SUBSCRIPTION']} className="d-block text-center text-dark mt-1">I
                                would like the premium !</Link> : null}
                    </div>

                    <div className="col-md-5 col-10 mb-5">
                        <div className="card">
                            <div className="card-header text-center">
                                Free build
                            </div>
                            <div className="card-body">
                                <img className="d-block mx-auto w-100" src={freeBuild} alt=""/>
                            </div>

                            <div className="features-list">
                                <ul className="flex-column">
                                    <li>Wallhack (Glow)</li>
                                    <li>Bunny Hop</li>
                                </ul>
                            </div>

                            <Link to="" onClick={e => this.onDownloadBuild(e, "free")} className="btn btn-dark">Download</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

const mapDispatchToProps = (dispatch) => {
    return{
        addToast: (type, content) => {
            dispatch(addToast(type, content));
        }
    }
};



export default connect(null, mapDispatchToProps)(DownloadPage);