import React from 'react';
import axios from 'axios';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWindowClose} from "@fortawesome/free-solid-svg-icons";
import {API_ROUTES, API_URL} from "../../../../config/Config";
import {connect} from "react-redux";
import {TOAST_ENUM} from "../../../Toaster/ToastEnum";
import {addToast} from "../../../../reducers/actions/ToastActions";

class SubscriptionKeyTableActionForm extends React.Component{

    constructor(props){
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e){
        e.preventDefault();

        const {account, addToast, onSuccess, id} = this.props;

        axios.delete(API_URL + API_ROUTES['DELETE_SUBSCRIPTION_CODE'] + id, {
            headers: {'Authorization': "bearer " + account.token}
        }).then(response => {
            let data = response.data;

            switch(data.code){
                case 200:
                    addToast(TOAST_ENUM['SUCCESS'], 'This key has been successfully removed !');
                    //update
                    onSuccess();
                    break;
                default:
                    break;
            }

        }).catch(error => {
            let data = error.response.data;

            if(data.error != null && data.error.exception != null){
                addToast(TOAST_ENUM['ERROR'], data.error.message);
            }
        });

    }

    render() {
        return(
            <form onSubmit={e => this.onSubmit(e)}>
                <button className="btn btn-xs btn-danger d-block mx-auto" type="submit"><FontAwesomeIcon icon={faWindowClose} /></button>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        account: state.account
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addToast: (type, content) => {
            dispatch(addToast(type, content));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionKeyTableActionForm);