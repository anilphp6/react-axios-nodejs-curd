import { combineReducers } from 'redux'
import UserReducer from "./user";

const reducer = combineReducers({
    usersState: UserReducer,
});


export default reducer;