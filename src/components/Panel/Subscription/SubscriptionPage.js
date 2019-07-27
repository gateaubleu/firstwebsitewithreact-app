import React from 'react';
import Breadcrumb from "../Breadcrumb";
import {PRICES_SUBSCRIPTIONS, SELLY_LINK} from "../../../config/Config";
import SubscriptionActivationForm from "./SubscriptionActivationForm";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";

function SubscriptionPage({account}) {
    return (
        <div id="subscription">
            <Breadcrumb title="Subscription management"/>
            <div className="row justify-content-around">
                <div className="col-10 mb-5">
                    <div className="card">
                        <div className="card-header text-center">
                            Buy subscription
                        </div>
                        <div className="card-body">
                            <table className="table table-bordered table-hover no-m">
                                <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Access time</th>
                                    <th scope="col">Price</th>
                                    <th scope="col"></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>ONE BALL</td>
                                    <td>1 month</td>
                                    <td>{PRICES_SUBSCRIPTIONS['ONE']}</td>
                                    <td className="text-center"><a className="btn btn-dark" rel="noopener noreferrer" target="_blank" href={SELLY_LINK['ONE']}><FontAwesomeIcon icon={faShoppingCart} /></a></td>
                                </tr>
                                <tr>
                                    <td>TWO BALLS</td>
                                    <td>3 months</td>
                                    <td>{PRICES_SUBSCRIPTIONS['THREE']}</td>
                                    <td className="text-center">
                                        <a className="btn btn-dark" rel="noopener noreferrer" target="_blank" href={SELLY_LINK['THREE']} ><FontAwesomeIcon icon={faShoppingCart} /></a>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span style={{color: 'darkred', fontWeight: 'bold'}}>* </span>BIG BALLS</td>
                                    <td>Lifetime</td>
                                    <td>{PRICES_SUBSCRIPTIONS['LIFETIME']}</td>
                                    <td className="text-center">Contact Ten#8279</td>
                                </tr>
                                </tbody>
                            </table>

                            <div className="avertissement">
                                <p>The activation code will be received by email, with a guide to start with the cheat.</p>
                                <p>The </p>
                                <small><span style={{color: 'darkred', fontWeight: 'bold'}}>* </span> You must be a old customer (1 month min) for buy a lifetime build.</small>
                            </div>


                        </div>
                    </div>
                </div>

                <div className="col-10 mb-5">
                    <div className="card">
                        <div className="card-header text-center">
                            Active my subscription
                        </div>
                        <div className="card-body">
                            <SubscriptionActivationForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SubscriptionPage;