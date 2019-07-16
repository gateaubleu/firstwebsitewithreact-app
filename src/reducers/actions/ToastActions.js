import uniqid from 'uniqid';

export const ADD_TOAST = 'ADD_TOAST';
export const REMOVE_TOAST = 'REMOVE_TOAST';

export function addToast(type, content){
    return{
        type:ADD_TOAST,
        payload:{
            id: uniqid(),
            type: type,
            content: content
        }
    };
}

export function removeToast(id){
    return{
        type: REMOVE_TOAST,
        payload: {
            id: id
        }
    }
}