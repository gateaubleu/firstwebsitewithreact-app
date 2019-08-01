import {REMOVE_ACCOUNT, SET_ACCOUNT} from "./actions/AccountActions";
import {ADMIN, CUSTOMER, MODERATOR} from "../components/Authentication/RoleEnum";

function accountReducer(state = [], action){
    switch(action.type){
        case SET_ACCOUNT:
            //set customer
            if(action.payload.roles.indexOf(CUSTOMER) !== -1){
                action.payload.isCustomer = true;
            }

            if(action.payload.roles.indexOf(MODERATOR) !== -1){
                action.payload.isModerator = true;
            }

            if(action.payload.roles.indexOf(ADMIN) !== -1){
                action.payload.isAdmin = true;
            }

            return {...action.payload};
        case REMOVE_ACCOUNT:
            return [];
        default:
            return state;
    }
}

export default accountReducer;