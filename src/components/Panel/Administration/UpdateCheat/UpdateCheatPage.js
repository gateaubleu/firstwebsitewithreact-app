import React from 'react';
import Breadcrumb from "../../Breadcrumb";
import {API_ROUTES, API_URL, EXAMPLE_FILE_UPDATE} from "../../../../config/Config";
import {connect} from "react-redux";
import {addToast} from "../../../../reducers/actions/ToastActions";
import {TOAST_ENUM} from "../../../Toaster/ToastEnum";
import axios from 'axios';

class UpdateCheatPage extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            updatedFile: null
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e){
        e.preventDefault();

        const {addToast} = this.props;
        const {account} = this.props;

        let file = this.state.updatedFile;

        let errors = [];

        if(file !== null){
            file = this.state.updatedFile[0];
            //console.log(file);

            if(file.name !== "csgo.min.json"){
                errors.push('Please upload the file named csgo.min.json.')
            }

            if(file.type !== "application/json"){
                errors.push('This file is not allowed, please upload only json file.');
            }

            if(errors.length === 0){
                var formData = new FormData();
                formData.append("json_file", this.state.updatedFile[0]);

                axios.post(API_URL + API_ROUTES['UPLOAD_UPDATE_CHEAT_JSON'], formData, {
                    headers: {
                        'Authorization': "bearer " + account.token,
                        'Content-Type': 'multipart/form-data'
                    },
                }).then((response) => {
                    const data = response.data;

                    switch(data.code){
                        case 200:
                            addToast(TOAST_ENUM['SUCCESS'], 'The file for update has been successfully replaced.')
                            break;
                        case 400:
                            if(data.errors.length !== 0){
                                data.errors.map(error => addToast(TOAST_ENUM['ERROR'], error));
                            }
                            else{
                                addToast(TOAST_ENUM['ERROR'], 'Please refresh the page.');
                            }
                            break;
                        default:
                            break;
                    }
                }).catch(error => {
                    let data = error.response.data;

                    if(data.error != null && data.error.exception != null){
                        addToast(TOAST_ENUM['ERROR'], data.error.exception[0].message);
                    }
                });
            }
            else{
                errors.forEach(error => addToast(TOAST_ENUM['ERROR'], error));
            }
        }
        else{
            addToast(TOAST_ENUM['ERROR'], 'You need to select file.');
        }

    }

    render(){
        return(
            <div id="update-cheat">
                <Breadcrumb title="Update the cheat" />

                <div className="row justify-content-around">
                    <div className="col-sm-8 col-md-6 col-xl-4 card">
                        <div className="card-header">
                            Update
                        </div>
                        <div className="card-body">
                            <form onSubmit={e => this.onSubmit(e)} action="" encType="multipart/form-data">

                                <div className="form-group d-block mx-auto w-50">
                                    <label htmlFor="updatedFile">File:</label>
                                    <input type="file" className="form-control-file" onChange={e => this.setState({updatedFile: e.target.files})} accept=".json,application/json" id="updatedFile" />
                                    <small className="d-block text-center form-text text-muted">You need to take a csgo.min.json like <a target="_blank" rel="noopener noreferrer" href={EXAMPLE_FILE_UPDATE}>here</a></small>
                                </div>

                                <button type="submit" className="btn btn-dark d-block mx-auto">Update</button>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToast: (type, content) =>{
            dispatch(addToast(type, content));
        }
    }
};

export default connect(null, mapDispatchToProps)(UpdateCheatPage);