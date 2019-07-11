import React from 'react';
import {PRICES_NAME} from "../../config/Config";
import main from '../../assets/img/try.png';
import BgContainer from "../BgContainer";

function Price() {
    return (
        <div id="price">

            <BgContainer backgroundImage={main}/>

            <div id="price-content" className="container">
                <h1 style={{textTransform: 'uppercase'}}>Who said that buying balls is expensive?</h1>
                <p>Notre cheat est de bonne qualité, mais nous savons que personne ne veux se ruiner pour pouvoir activer à tous moment, donc nos prix sont assez bas par apport à la concurrence.</p>

                <div className="row justify-content-around">
                    <div className="col-md-3 price">
                        <div className="title">
                            <h2>NOVA</h2>
                        </div>

                        <ul>
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

                        <ul>
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

                        <ul>
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
            </div>
        </div>

    );
}

export default Price;