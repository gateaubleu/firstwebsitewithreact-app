export const SET_ACCOUNT = "SET_ACCOUNT";
export const REMOVE_ACCOUNT = "REMOVE_ACCOUNT";


export function setAccount(username, roles, token){
    return {
        type: SET_ACCOUNT,
        payload: {
            username: username,
            roles: roles,
            token: token

        }
    }
}

export function removeAccount(){
    return {
        type: REMOVE_ACCOUNT,
        payload: null
    }
}
