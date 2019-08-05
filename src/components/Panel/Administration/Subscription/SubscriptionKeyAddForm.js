import React from 'react';
import axios from 'axios';
import {SubscriptionTimeEnum} from "./SubscriptionTimeEnum";
import {API_ROUTES, API_URL} from "../../../../config/Config";
import {TOAST_ENUM} from "../../../Toaster/ToastEnum";
import {connect} from "react-redux";
import {addToast} from "../../../../reducers/actions/ToastActions";

class SubscriptionKeyAddForm extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            amount: 0,
            time: SubscriptionTimeEnum['ONE_WEEK'],
            results: []
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e){
        e.preventDefault();

        const {account, addToast, onSuccess} = this.props;

        axios.post(API_URL + API_ROUTES['ADD_SUBSCRIPTION_CODE'], {
            amount: this.state.amount,
            time: this.state.time
        }, {
            headers: {'Authorization': "bearer " + account.token}
        }).then(response => {
            let data = response.data;

            switch(data.code){
                case 200:
                    addToast(TOAST_ENUM['SUCCESS'], 'You have successfully generated ' + this.state.amount + ' subscription keys !');
                    this.setState({results: data.results});
                    onSuccess();
                    break;
                case 400:
                    if(data.errors.length !== 0){
                        data.errors.map(error => addToast(TOAST_ENUM['ERROR'], error));
                    }
                    else{
                        addToast(TOAST_ENUM['ERROR'], 'Please refresh the page or contact support team.');
                    }
                    break;
                default:
                    break;
            }

        });
    }

    render(){
        return(
            <div className="w-50 mx-auto mb-5">
                <form onSubmit={e => this.onSubmit(e)}>
                    <div className="form-row justify-content-around">
                        <div className="form-group col-5">
                            <label htmlFor="numberKeys">Amount:</label>
                            <input type="number" className="form-control" id="numberKeys" onChange={e => this.setState({amount: e.target.value})} value={this.state.amount}/>
                        </div>

                        <div className="form-group col-5">
                            <label htmlFor="timeKeys">Time:</label>
                            <select className="form-control" id="timeKeys" onChange={e => this.setState({time: e.target.value})} value={this.state.time}>
                                <option value={SubscriptionTimeEnum['ONE_WEEK']}>1 week</option>
                                <option value={SubscriptionTimeEnum['ONE_MONTH']}>1 month</option>
                                <option value={SubscriptionTimeEnum['THREE_MONTHS']}>3 months</option>
                                <option value={SubscriptionTimeEnum['LIFETIME']}>24 months</option>
                            </select>
                        </div>
                    </div>

                    <button className="d-block mx-auto btn btn-dark" type="submit">Generate</button>
                </form>

                <p>Results:</p>
                <textarea className="form-control" id="" cols="30" rows="10" value={this.state.results} onChange={e => e.target.value}></textarea>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToast: (type, content) => {
            dispatch(addToast(type, content));
        }
    }
};

export default connect(null, mapDispatchToProps)(SubscriptionKeyAddForm);