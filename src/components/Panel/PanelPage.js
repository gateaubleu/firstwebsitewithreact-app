import React from 'react';
import './Panel.css';
import smallIcon from '../../assets/img/small-icon.png';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAllergies, faCog, faDownload, faHome, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";

function PanelPage({logo}) {
    return(
        <div className="d-flex">
            <div className="sidebar bg-gradient-grey">
                <div className="sidebar-brand">
                    <img src={logo} className="icon mx-auto" alt=""/>
                    <img src={smallIcon} className="small-icon mx-auto" alt="" />
                </div>

                <hr className="separator"/>

                <ul className="nav flex-column">
                    <li className="nav-item">
                        <a className="nav-link" href="#"><FontAwesomeIcon icon={faHome} /><span className="nav-text">Home</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#"><FontAwesomeIcon icon={faDownload} /><span className="nav-text">Download cheat</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#"><FontAwesomeIcon icon={faAllergies} /><span className="nav-text">Subscriptions</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#"><FontAwesomeIcon icon={faCog} /><span className="nav-text">Configure my shit</span></a>
                    </li>
                </ul>
            </div>
            <div className="content-container">
               <div className="top-content">
                   <div className="profile">
                       <div className="d-flex justify-content-end align-items-center">
                           <img src="https://css-tricks.com/wp-content/uploads/2018/10/align-items.svg" className="profile-pic" alt=""/>
                           <p>Ten</p>
                           <a className="text-black-50" href="#"><FontAwesomeIcon icon={faSignOutAlt} /></a>
                       </div>

                   </div>
               </div>
            </div>
        </div>
    );
}

export default PanelPage;