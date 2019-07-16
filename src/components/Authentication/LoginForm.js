import React from 'react';
import {API_ROUTES} from "../../config/Config";
import {connect} from "react-redux";
import {addToast} from "../../reducers/actions/ToastActions";
import {TOAST_ENUM} from "../Toaster/ToastEnum";

class LoginForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();

        this.props.addToast(TOAST_ENUM['ERROR'], 'Wrong credentials.');
    }

    render() {
        return(
            <form className="w-50 d-block mx-auto" onSubmit={e => this.handleSubmit(e)} action={API_ROUTES['LOGIN']}>

                <h2 className="text-center font-weight-bold">Login to your member area.</h2>

                <div className="form-group">
                    <label htmlFor="usernameLogin">Username:</label>
                    <input type="text" className="d-block form-control" required id="usernameLogin" onChange={e => this.setState({username: e.target.value})} value={this.state.username} placeholder="Username..."/>
                </div>

                <div className="form-group">
                    <label htmlFor="passwordLogin">Password:</label>
                    <input type="password" className="d-block form-control" required id="passwordLogin" onChange={e => this.setState({password: e.target.value})} value={this.state.password} placeholder="Password..."/>
                </div>

                <button type="submit" className="mt-5 d-block mx-auto btn btn-danger">Sign In</button>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        addToast: (type, content) => {
            dispatch(addToast(type, content))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);