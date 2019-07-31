import React, {Fragment} from 'react';
import axios from 'axios';
import {API_ROUTES, API_URL, PREFIX_LOCALSTORE} from "../../config/Config";
import {connect} from "react-redux";
import {removeAccount, setAccount} from "../../reducers/actions/AccountActions";
import {addToast} from "../../reducers/actions/ToastActions";
import {TOAST_ENUM} from "../Toaster/ToastEnum";

/**
 * This component is only for account management like (authentication expiration)
 */
class AccountManagement extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showNeedMemberArea: false,
            showSessionTimeout: false
        };
        this.checkAccountAuthentication = this.checkAccountAuthentication.bind(this);
    }

    /**
     * Function for check in localStorage if account already logged.
     */
    checkAccountAuthentication() {

        const {addToast} = this.props;
        const {showNeedMemberArea, showSessionTimeout} = this.state;

        if(localStorage.getItem(PREFIX_LOCALSTORE + 'token')){
            if(localStorage.getItem(PREFIX_LOCALSTORE + 'tokenTimeout')){
                if((new Date()) >= new Date(localStorage.getItem(PREFIX_LOCALSTORE + 'tokenTimeout') * 1000)){
                    localStorage.clear();

                    //inform user about end of session
                    if(!showSessionTimeout && this.props.account.length !== 0){
                        addToast(TOAST_ENUM['INFO'], 'You have been disconnected due to session timeout, please reconnect your account.');
                        this.setState({showSessionTimeout: true});
                    }

                    this.props.removeAccount();
                }
                else{
                    // reconnection / update
                    axios.get(API_URL + API_ROUTES['AUTH_TOKEN'], {
                        headers: {'Authorization': "bearer " + localStorage.getItem(PREFIX_LOCALSTORE + 'token')}
                    }).then(
                        (response) => {
                            let data = response.data;
                            this.props.setAccount(data.username, data.roles, localStorage.getItem(PREFIX_LOCALSTORE + 'token'));
                            this.setState({
                                showNeedMemberArea: false,
                                showSessionTimeout: false
                            })
                        }
                    );
                }
            }
        }
        else{
            if(!showNeedMemberArea && this.props.pathname.startsWith("/panel/") && this.props.account.length === 0){
                addToast(TOAST_ENUM['INFO'], 'You have to be connected in order to access to the member area.');
                this.setState({showNeedMemberArea: true});
            }
        }
    }


    componentDidMount() {
        this.checkAccountAuthentication();
        //ici faire un truc pour dire qu'on a été check si un compte existait et donc ne pas pouvoir accéder au panel (Store, avec un truc du genre "
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
        },
        addToast: (type, content) => {
            dispatch(addToast(type, content));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountManagement);