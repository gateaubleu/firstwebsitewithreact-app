import {ADD_TOAST, REMOVE_TOAST} from "./actions/ToastActions";

function toastReducer(state = [], action) {
    console.log(action);
    switch (action.type) {
        case ADD_TOAST:
            return [...state, action.payload];
        case REMOVE_TOAST:
            let filteredState = [...state];
            return filteredState.filter(toast => toast.id !== action.payload.id);
        default:
            return state
    }
}

export default toastReducer;