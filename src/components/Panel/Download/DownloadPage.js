import React from 'react';
import Breadcrumb from "../Breadcrumb";
import freeBuild from '../../../assets/img/free-build.jpg';
import premiumBuild from '../../../assets/img/premium-build.jpg';
import {Link} from "react-router-dom";
import {APP_ROUTES} from "../../../config/Config";

function DownloadPage({account}) {

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

                        <Link to=""
                              className={account && premium ? "btn btn-dark" : "btn btn-dark disabled"}>Download</Link>
                    </div>
                    {!premium ? <Link to={APP_ROUTES['PANEL_SUBSCRIPTION']} className="d-block text-center text-dark mt-1">I would like the premium !</Link> : null}
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

                        <Link to="" className="btn btn-dark">Download</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DownloadPage;