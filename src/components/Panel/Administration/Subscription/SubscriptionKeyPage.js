import React from 'react';
import Breadcrumb from "../../Breadcrumb";
import SubscriptionKeyTable from "./SubscriptionKeyTable";
import axios from 'axios';
import {API_ROUTES, API_URL} from "../../../../config/Config";
import {connect} from "react-redux";
import {addToast} from "../../../../reducers/actions/ToastActions";
import {TOAST_ENUM} from "../../../Toaster/ToastEnum";
import SubscriptionKeyAddForm from "./SubscriptionKeyAddForm";

class SubscriptionKeyPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            keys: []
        };

        this.updateKeys = this.updateKeys.bind(this);
    }

    componentDidMount() {
        //update subscription key
        this.updateKeys();
    }

    /**
     * Function for update/fill the subscription key
     */
    updateKeys(){
        const {account} = this.props;
        const {addToast} = this.props;

        axios.get(API_URL + API_ROUTES['GET_ALL_SUBSCRIPTION_CODE'], {
            headers: {'Authorization': "bearer " + account.token}
        }).then(response => {
            this.setState({keys: response.data})
        }).catch(error => {
            let data = error.response.data;

            if(data.error != null && data.error.exception != null){
                addToast(TOAST_ENUM['ERROR'], data.error.exception[0].message);
            }
        });
    }

    render() {
        const {account} = this.props;

        return (
            <div id="subscription-key-admin">
                <Breadcrumb title="Subscription key management"/>
                <SubscriptionKeyAddForm account={account} onSuccess={this.updateKeys} />

                <hr className="w-50"/>

                <SubscriptionKeyTable data={this.state.keys} onSuccess={this.updateKeys}/>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        addToast: (type, content) => {
            dispatch(addToast(type, content));
        }
    }
};

export default connect(null, mapDispatchToProps)(SubscriptionKeyPage);