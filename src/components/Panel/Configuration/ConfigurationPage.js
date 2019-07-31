import React from 'react';
import Breadcrumb from "../Breadcrumb";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfoCircle, faSave} from "@fortawesome/free-solid-svg-icons";
import AimbotConfigurationForm from "./AimbotConfigurationForm";
import {connect} from "react-redux";
import {addToast} from "../../../reducers/actions/ToastActions";
import VisualConfigurationForm from "./VisualConfigurationForm";

function ConfigurationPage({account, addToast}){
    return(
        <div id="configuration">
            <Breadcrumb title="Configure my shit" />

            <div className="alert alert-warning w-50 d-block mx-auto mb-5" role="alert">
                <FontAwesomeIcon icon={faInfoCircle} /> In order to confirm changes about your configuration don't forget to press <p className="btn btn-xs btn-danger"><FontAwesomeIcon icon={faSave} /></p> button.
            </div>

            <div className="row justify-content-around">
                <div className="col-10 col-sm-5 mb-5">
                    <AimbotConfigurationForm addToast={addToast} saveIcon={faSave} account={account} />
                </div>

                <div className="col-10 col-sm-5 mb-5">
                    <VisualConfigurationForm addToast={addToast} saveIcon={faSave} account={account} />
                </div>

                <div className="col-10 col-sm-5 mb-5">
                    <div className="card">
                        <div className="card-header text-center">
                            Misc
                        </div>
                        <div className="card-body"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return{
        addToast: (type, content) => {
            dispatch(addToast(type, content))
        }
    }
};

export default connect(null, mapDispatchToProps)(ConfigurationPage);