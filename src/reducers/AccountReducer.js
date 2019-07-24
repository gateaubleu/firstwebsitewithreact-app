import {REMOVE_ACCOUNT, SET_ACCOUNT} from "./actions/AccountActions";

function accountReducer(state = [], action){
    switch(action.type){
        case SET_ACCOUNT:
            return action.payload;
        case REMOVE_ACCOUNT:
            return [];
        default:
            return state;
    }
}

export default accountReducer;