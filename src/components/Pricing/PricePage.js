import React from 'react';
import {Link} from "react-router-dom";
import {APP_ROUTES, PRICES_SUBSCRIPTIONS, SELLY_LINK} from "../../config/Config";
import main from '../../assets/img/connector.jpg';
import BgContainer from "../BgContainer";

function PricePage() {
    return (
        <div id="price">

            <BgContainer backgroundImage={main}/>

            <div id="price-content" className="content container">
                <h1 style={{textTransform: 'uppercase', fontWeight: 'bold'}}>Who said that buying balls is expensive ?</h1>
                <p className="description">Our cheat is of good quality, but we know that no one wants to ruin himself to be able to activate at any time, so our prices are quite low compared to the other cheats.</p>

                <div className="row justify-content-around">
                    <a className="col-md-3 price-link" rel="noopener noreferrer" target="_blank" href={SELLY_LINK['ONE']}>
                        <div className="price">
                            <div className="title">
                                <h2>ONE BALL</h2>
                            </div>

                            <ul className="ul-custom">
                                <li>1 month access</li>
                                <li>All features</li>
                                <li>Slotted build</li>
                                <li>Support Discord</li>
                            </ul>

                            <div className="text-price">
                                {PRICES_SUBSCRIPTIONS['ONE']}
                            </div>
                        </div>
                    </a>
                    <a className="col-md-3 price-link" rel="noopener noreferrer" target="_blank" href={SELLY_LINK['THREE']}>
                        <div className="price">
                            <div className="title">
                                <h2>TWO BALLS</h2>
                            </div>

                            <ul className="ul-custom">
                                <li>3 month access</li>
                                <li>All features</li>
                                <li>Slotted build</li>
                                <li>Support Discord</li>
                            </ul>

                            <div className="text-price">
                                {PRICES_SUBSCRIPTIONS['THREE']}
                            </div>
                        </div>
                    </a>
                    <Link to={APP_ROUTES['PANEL_SUBSCRIPTION']} className="col-md-3 price-link">
                        <div className="price">
                            <div className="title">
                                <h2>BIG BALLS</h2>
                            </div>

                            <ul className="ul-custom">
                                <li>Lifetime access</li>
                                <li>All features</li>
                                <li>Slotted build</li>
                                <li>Support Discord</li>
                            </ul>

                            <div className="text-price">
                                {PRICES_SUBSCRIPTIONS['LIFETIME']}
                            </div>
                        </div>
                    </Link>
                </div>
                <p className="mt-5">Buying from us is very simple and it only takes a few seconds, click on one of our offers, you will be redirected to our shop, then simply enter your code in the "Subscription" section.</p>
            </div>
        </div>
    );
}

export default PricePage;