import {REMOVE_ACCOUNT, SET_ACCOUNT} from "./actions/AccountActions";
import {CUSTOMER} from "../components/Authentication/RoleEnum";

function accountReducer(state = [], action){
    switch(action.type){
        case SET_ACCOUNT:
            //set customer
            if(action.payload.roles.indexOf(CUSTOMER) !== -1){
                action.payload.isCustomer = true;
            }
            return {...action.payload};
        case REMOVE_ACCOUNT:
            return [];
        default:
            return state;
    }
}

export default accountReducer;