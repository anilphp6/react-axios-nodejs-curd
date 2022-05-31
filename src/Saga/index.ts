import { all, fork } from 'redux-saga/effects';
import { usersData } from './user';

export const rootSaga = function* root() {
    yield all([fork(usersData)]);
};