import React from 'react';
import Breadcrumb from "../Breadcrumb";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {ANTICHEATS, DISCORD_CLIENT_ID, RELEASE_DATE, STATUT, UPDATE_DATE} from "../../../config/Config";

function HomePage({account}) {
    let roles = "Free member";
    let color = "darkgray";

    if(account.isCustomer){
        roles = "Premium member";
        color = "#d09230";
    }

    if(account.isAdmin || account.isModerator){
        roles = "Staff";
        color = "#702320";
    }

    return (
        <div id="home">
            <Breadcrumb title="Home"/>
            <div className="user-informations">
                <div className="row justify-content-center">
                    <div className="profile-pic col-2 col-md-2">
                        <img src="https://css-tricks.com/wp-content/uploads/2018/10/align-items.svg"
                             className="d-block mx-auto profile-pic" alt=""/>
                    </div>
                    <div className="informations col-7 col-md-5">
                        <ul className="nav flex-column">
                            <li><h2 id="username">{account.username}</h2></li>
                            <li style={{color: color}} className="font-italic font-weight-bolder">{roles}</li>
                            <li>Subscription end: {account.subscriptionEnd}</li>
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
                <div className="col-md-5 col-10 mb-5">
                    <div className="card">
                        <div className="card-header">
                            About hack
                        </div>
                        <div className="card-body">
                            <div className="list">
                                <ul className="nav flex-column mb-3">
                                    <li><b>Last detection</b>: <span style={{color: 'green'}}><b>{STATUT}</b></span></li>
                                    <li><b>Release date</b>: {RELEASE_DATE}</li>
                                    <li><b>Last update</b>: {UPDATE_DATE}</li>
                                </ul>

                                <p className="mt-3">Anticheat</p>
                                <ul className="flex-column">
                                    {ANTICHEATS.map(ac => <li key={ac}>{ac}: <FontAwesomeIcon className="text-green"
                                                                                              icon={faCheck}/></li>)}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-5 col-10 mb-5">
                    <iframe src={"https://discordapp.com/widget?id="+ DISCORD_CLIENT_ID +"&theme=dark"} width="350"
                            height="500"frameBorder="0"></iframe>
                </div>
            </div>
        </div>
    );
}

export default HomePage;