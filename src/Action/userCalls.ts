import * as actionTypes from '../ActionType/user';



export const getUsers = (): actionTypes.BaseAction => ({
    type: actionTypes.GET_ALL_USERS,
});

export const setUsers = (
    usersData: any
): actionTypes.BaseAction => ({
    type: actionTypes.UPDATE_USERS,
    payload: usersData,
});

export const getUsersError = (error: any) => {
    return { type: actionTypes.ERROR, error }
}
export const deleteUser = (id: any) => {
    console.log('Action')
    return {
        type: actionTypes.DELETE_USER,
        payload: id
    }
}

export const addUser = (userData: any) => {
    return {
        type: actionTypes.ADD_USER,
        payload: userData
    }
}
export const updateUser = (userData: any) => {
    return {
        type: actionTypes.UPDATE_USER,
        payload: userData
    }
}