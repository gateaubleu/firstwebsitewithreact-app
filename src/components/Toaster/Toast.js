import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faInfoCircle, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {TOAST_ENUM} from "./ToastEnum";
import {TOAST_TIMEOUT} from "../../config/Config";

class Toast extends React.Component{
    constructor(props){
        super(props);
        this.removeToast = props.removeToast;
    }

    componentDidMount() {
        const {toast} = this.props;
        setTimeout(() => this.removeToast(toast.id), TOAST_TIMEOUT);
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
            case TOAST_ENUM['INFO']:
                iconToast = faInfoCircle;
                break;
            default:
                break;
        }

        return(
            <div onClick={e => this.removeToast(toast.id)} className={"toast toast-" + toast.type}>
                <div className="toast-body">
                    <div className="row">
                        <div className="col-2">
                            <FontAwesomeIcon className="d-block mx-auto" icon={iconToast}/>
                        </div>
                        <div className="col-10">
                            <p>{toast.content}</p>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default Toast;