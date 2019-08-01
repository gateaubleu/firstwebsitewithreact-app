export const SET_ACCOUNT = "SET_ACCOUNT";
export const REMOVE_ACCOUNT = "REMOVE_ACCOUNT";


export function setAccount(username, roles, subscriptionEnd, token){

    let date = new Date(subscriptionEnd);
    return {
        type: SET_ACCOUNT,
        payload: {
            username: username,
            roles: roles,
            token: token,
            subscriptionEnd: date.getUTCDay() + "/" + date.getMonth() + "/" + date.getFullYear() + " at "+ date.getHours() + ":"+date.getMinutes(),
            isCustomer: false,
            isModerator: false,
            isAdmin: false
        }
    }
}

export function removeAccount(){
    return {
        type: REMOVE_ACCOUNT,
        payload: null
    }
}
