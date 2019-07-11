import React from 'react';
import {PRICES_NAME} from "../../config/Config";
import main from '../../assets/img/connector.jpg';
import BgContainer from "../BgContainer";

function Price() {
    return (
        <div id="price">

            <BgContainer backgroundImage={main}/>

            <div id="price-content" className="content container">
                <h1 style={{textTransform: 'uppercase', fontWeight: 'bold'}}>Who said that buying balls is expensive ?</h1>
                <p className="description">Our cheat is of good quality, but we know that no one wants to ruin himself to be able to activate at any time, so our prices are quite low compared to the other cheats.</p>

                <div className="row justify-content-around">
                    <div className="col-md-3 price">
                        <div className="title">
                            <h2>NOVA</h2>
                        </div>

                        <ul className="ul-custom">
                            <li>1 month access</li>
                            <li>All features</li>
                            <li>Slotted build</li>
                            <li>Support Discord</li>
                        </ul>

                        <div className="text-price">
                            {PRICES_NAME['ONE']}
                        </div>
                    </div>
                    <div className="col-md-3 price">
                        <div className="title">
                            <h2>EAGLE</h2>
                        </div>

                        <ul className="ul-custom">
                            <li>3 month access</li>
                            <li>All features</li>
                            <li>Slotted build</li>
                            <li>Support Discord</li>
                        </ul>

                        <div className="text-price">
                            {PRICES_NAME['THREE']}
                        </div>
                    </div>
                    <div className="col-md-3 price">
                        <div className="title">
                            <h2>GLOBAL</h2>
                        </div>

                        <ul className="ul-custom">
                            <li>Lifetime access</li>
                            <li>All features</li>
                            <li>Slotted build</li>
                            <li>Support Discord</li>
                        </ul>

                        <div className="text-price">
                            {PRICES_NAME['LIFETIME']}
                        </div>
                    </div>
                </div>
                <p>Buying from us is very simple and it only takes a few seconds, click on one of our offers, you will be redirected to our shop, then simply enter your code in the "Activation of my subscriptions" section.</p>
            </div>
        </div>
    );
}

export default Price;