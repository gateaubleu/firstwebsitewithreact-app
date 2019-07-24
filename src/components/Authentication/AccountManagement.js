import React, {Fragment} from 'react';
import axios from 'axios';
import {API_ROUTES, API_URL, PREFIX_LOCALSTORE} from "../../config/Config";
import {connect} from "react-redux";
import {removeAccount, setAccount} from "../../reducers/actions/AccountActions";

/**
 * This component is only for account management like (authentication expiration)
 */
class AccountManagement extends React.Component{
    constructor(props){
        super(props);

        this.checkAccountAuthentication = this.checkAccountAuthentication.bind(this);
    }

    checkAccountAuthentication() {
        if(localStorage.getItem(PREFIX_LOCALSTORE + 'token')){
            if(localStorage.getItem(PREFIX_LOCALSTORE + 'tokenTimeout')){
                if((new Date()) >= new Date(localStorage.getItem(PREFIX_LOCALSTORE + 'tokenTimeout') * 1000)){
                    localStorage.clear();
                    this.props.removeAccount();
                }
                else{
                    //reconnection
                    if(this.props.account.length === 0){
                        axios.get(API_URL + API_ROUTES['AUTH_TOKEN'], {
                            headers: {'Authorization': "bearer " + localStorage.getItem(PREFIX_LOCALSTORE + 'token')}
                        }).then(
                            (response) => {
                                let data = response.data;
                                this.props.setAccount(data.username, data.roles, localStorage.getItem(PREFIX_LOCALSTORE + 'token'));
                            }
                        );
                    }
                }
            }
        }
    }


    componentDidMount() {
        this.checkAccountAuthentication();
        this.interval = setInterval(() => { this.checkAccountAuthentication() }, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render(){
        return(<Fragment></Fragment>);
    }

}

const mapStateToProps = (state) => {
    return{
        account: state.account
    }
};

const mapDispatchToProps = (dispatch) => {
    return{
        removeAccount: () => {
            dispatch(removeAccount());
        },
        setAccount: (username, roles, token) => {
            dispatch(setAccount(username, roles, token));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountManagement);