import React from 'react';
import Toast from './Toast';
import {connect} from "react-redux";
import {removeToast} from "../../reducers/actions/ToastActions";

class ToastList extends React.Component{
    render(){
        const {toasts} = this.props;
        return(
            <div className="toast-container">
                {toasts.length !== 0 ? toasts.map((toast, key) => (
                    <Toast key={key} toast={toast} removeToast={this.props.removeToast}/>
                )) : null}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        toasts: state.toasts
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeToast: (id) => {
            dispatch(removeToast(id));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ToastList);