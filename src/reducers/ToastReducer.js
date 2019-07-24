import {ADD_TOAST, CLEAR_TOASTS, REMOVE_TOAST} from "./actions/ToastActions";

function toastReducer(state = [], action) {
    switch (action.type) {
        case ADD_TOAST:
            return [...state, action.payload];
        case REMOVE_TOAST:
            let filteredState = [...state];
            return filteredState.filter(toast => toast.id !== action.payload.id);
        case CLEAR_TOASTS:
            return [];
        default:
            return state
    }
}

export default toastReducer;