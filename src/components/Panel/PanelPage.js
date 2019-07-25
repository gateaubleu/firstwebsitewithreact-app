import React from 'react';
import './Panel.css';
import smallIcon from '../../assets/img/small-icon.png';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAllergies, faCog, faDownload, faHome, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import ToastList from "../Toaster/ToastsList";
import PanelRouter from "../../PanelRouter";
import {Link} from "react-router-dom";
import {APP_ROUTES} from "../../config/Config";

function PanelPage({account, onLogout, logo}) {
    return (
        <div id="panel-page" className="d-flex">
            <div className="sidebar bg-gradient-grey">
                <div className="sidebar-brand">
                    <img src={logo} className="icon mx-auto" alt=""/>
                    <img src={smallIcon} className="small-icon mx-auto" alt=""/>
                </div>

                <hr className="separator"/>

                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link className="nav-link" to={APP_ROUTES['PANEL_HOME']}><FontAwesomeIcon icon={faHome}/><span
                            className="nav-text">Home</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={APP_ROUTES['PANEL_DOWNLOAD']}><FontAwesomeIcon icon={faDownload}/><span className="nav-text">Download cheat</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={APP_ROUTES['PANEL_SUBSCRIPTION']}><FontAwesomeIcon icon={faAllergies}/><span
                            className="nav-text">Subscriptions</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={APP_ROUTES['PANEL_CONFIGURATION']}><FontAwesomeIcon icon={faCog}/><span className="nav-text">Configure my shit</span></Link>
                    </li>
                </ul>
            </div>
            <div className="content-container">
                <div className="top-content">
                    <div className="profile">
                        <div className="d-flex justify-content-end align-items-center">
                            <img src="https://css-tricks.com/wp-content/uploads/2018/10/align-items.svg"
                                 className="profile-pic" alt=""/>
                            <p>{account.username}</p>
                            <a className="text-black-50" onClick={e => onLogout()} href="#"><FontAwesomeIcon
                                icon={faSignOutAlt}/></a>
                        </div>
                    </div>
                </div>
                <ToastList/>
                <PanelRouter authenticated={account.length !== 0}/>
            </div>
        </div>
    );
}

export default PanelPage;