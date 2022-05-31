
import * as actionTypes from '../ActionType/user';

const initialState = {
    users: [],
    loading: false,
    error: null,
}
const UserReducer = (State: any = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.UPDATE_USERS:
            // console.log('action-->', action, State);
            return {
                ...State,
                users: action.payload,
            }
        case actionTypes.UPDATE_USER:
            const users = State.users && State.users.map((item: any) => {
                if (item.id == action.payload.id) {
                    return action.payload
                }
                return item;
            })
            console.log(users)
            return users;
        case actionTypes.DELETE_USER:
            const newState = State.users.filter((i: any) => i.id != action.payload)
            console.log('reducer', newState)
            return {
                users: newState,
                loading: false,
                error: null,
            };
        default:
            return State;
    }
}
export default UserReducer;