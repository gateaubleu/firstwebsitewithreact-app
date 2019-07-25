import React from 'react';
import Breadcrumb from "../Breadcrumb";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {connect} from "react-redux";
import {ANTICHEATS, RELEASE_DATE, STATUT, UPDATE_DATE} from "../../../config/Config";

class HomePage extends React.Component{

    constructor(props){
        super(props);
    }

    render() {
        const {account} = this.props;

        return (
            <div id="home">
                <Breadcrumb title="Home"/>
                <div className="user-informations">
                    <div className="d-flex">
                        <div className="profile-pic">
                            <img src="https://css-tricks.com/wp-content/uploads/2018/10/align-items.svg"
                                 className="d-block mx-auto profile-pic" alt=""/>
                        </div>
                        <div className="informations">
                            <ul className="nav flex-column">
                                <li><h2 id="username">{account.username}</h2></li>
                                <li>Member since 0 days</li>
                                <li>Subscription end: 25/07/2019</li>
                                <li>
                                    <div className="progress">
                                        <div className="progress-bar w-75" role="progressbar" aria-valuenow="75"
                                             aria-valuemin="0" aria-valuemax="100">
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div style={{marginTop: '25px'}} className="row justify-content-around">
                    <div className="col-md-5">
                        <div className="card">
                            <div className="card-header">
                                About hack
                            </div>
                            <div className="card-body">
                                <ul className="nav flex-column mb-3">
                                    <li><b>Last detection</b>: <span style={{color: 'green'}}><b>{STATUT}</b></span></li>
                                    <li><b>Release date</b>: {RELEASE_DATE}</li>
                                    <li><b>Last update</b>: {UPDATE_DATE}</li>
                                </ul>

                                <b className="mt-3">Anticheat</b>
                                <ul className="flex-column">
                                    {ANTICHEATS.map(ac => <li key={ac}>{ac}: <FontAwesomeIcon className="text-green" icon={faCheck}/></li>)}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-5">
                        <div className="card">
                            <div className="card-header">
                                Features
                            </div>
                            <div className="card-body">
                                <p className="text-center font-italic mb-3 mt-2">Our cheat is external, and made for
                                    legit player.</p>

                                <b>Aimbot</b>:
                                <ul className="flex-column">
                                    <li>Key</li>
                                    <li>Fov</li>
                                    <li>Smooth</li>
                                    <li>Bones</li>
                                    <li>Recoil compensation</li>
                                </ul>

                                <b>Triggerbot</b>:
                                <ul className="flex-column">
                                    <li>Key</li>
                                    <li>Delay between shots</li>
                                </ul>

                                <b>Visual</b>:
                                <ul className="flex-column">
                                    <li>Glow</li>
                                    <li>Enemy Color</li>
                                    <li>Ally Color</li>
                                    <li>Box 2D ESP</li>
                                    <li>Distance ESP</li>
                                </ul>

                                <b>Misc</b>:
                                <ul className="flex-column">
                                    <li>SoundESP</li>
                                    <li>Radar Hack</li>
                                    <li>Standalone recoil compensation</li>
                                </ul>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        account: state.account
    }
};

export default connect(mapStateToProps)(HomePage);