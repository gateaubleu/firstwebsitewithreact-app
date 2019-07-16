import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {TOAST_ENUM} from "./ToastEnum";
import {TOAST_TIMEOUT} from "../../config/Config";

class Toast extends React.Component{
    constructor(props){
        super(props);
        this.removeToast = props.removeToast;
    }

    componentDidMount() {
        const {toast} = this.props;
        this.timeout = setTimeout(() => this.removeToast(toast.id), TOAST_TIMEOUT);
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    render() {
        const {toast} = this.props;

        let iconToast = faCheckCircle;
        switch(toast.type){
            case TOAST_ENUM['ERROR']:
                iconToast = faTimesCircle;
                break;
            case TOAST_ENUM['SUCCESS']:
                iconToast = faCheckCircle;
                break;
            default:
                break;
        }

        return(
            <div onClick={(e) => this.removeToast(toast.id)} className={"toast toast-" + toast.type}>
                <div className="toast-body">
                    <p><FontAwesomeIcon icon={iconToast}/> {toast.content}</p>
                </div>
            </div>
        );
    }
}

export default Toast;