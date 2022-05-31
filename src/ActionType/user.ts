export const GET_ALL_USERS: string = 'GET_ALL_USERS';
export const GET_USER: string = 'GET_USER';
export const EDIT_USER: string = 'EDIT_USER';
export const UPDATE_USER: string = 'UPDATE_USER';
export const DELETE_USER: string = 'DELETE_USER';
export const UPDATE_USERS: string = 'UPDATE_USERS';
export const ERROR: string = 'GET_USERS_ERROR';
export const ADD_USER: string = 'ADD_USER';
export interface BaseAction {
    type: string;
    payload?: object | null;
}