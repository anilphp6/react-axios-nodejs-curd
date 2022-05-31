import { call, put, fork, take, takeEvery, takeLatest, select } from 'redux-saga/effects';
import { GET_ALL_USERS, DELETE_USER, ADD_USER, UPDATE_USER } from '../ActionType/user';
import UserDataService from '../services/service'
import { setUsers, getUsersError, getUsers } from '../Action/userCalls'
//import IUser, { IUserProps } from "../types/user.type";

function* getData() {
    yield fork(fetchUsers, GET_ALL_USERS);
}
function* deleteUser(action: any) {
    console.log('Saga222111111')
    yield fork(deleteAPi, action);
}
function* updateUser(action: any) {
    console.log('Saga222111111')
    yield fork(updateAPi, action);
}
function* updateAPi(action: any) {
    console.log('Saga222')
    const id = action.payload.id;
    yield call(UserDataService.update, action.payload, id)
}
function* addUser(action: any) {
    console.log('Saga222111111')
    yield fork(addApi, action);
}
function* addApi(action: any) {
    console.log('Saga222')
    const formData = action.payload;
    console.log(formData)
    yield call(UserDataService.create, formData)
    const { data } = yield call(UserDataService.getAll)
    yield put(getUsers())
}
function* deleteAPi(action: any) {
    console.log('Saga222')
    const id = action.payload;
    yield call(UserDataService.delete, id)
}
function* fetchUsers(acton: string): any {
    const users = yield select((state: any) => state);
    //console.log('asdasd->###', users.usersState, '##', users.usersState.users)
    if (users.usersState.users.length === 0) {
        console.log();
        try {
            // const userData = UserDataService.getAll().then(r => r);
            const { data } = yield call(UserDataService.getAll)
            yield put(setUsers(data))
        } catch (error) {
            yield put(getUsersError(error))
        }
    }
}

export function* usersData() {
    /*  yield [
         getData()
     ] */
    yield takeEvery(GET_ALL_USERS, getData);
    yield takeEvery(DELETE_USER, deleteUser);
    yield takeEvery(ADD_USER, addUser);
    yield takeEvery(UPDATE_USER, updateUser);

}