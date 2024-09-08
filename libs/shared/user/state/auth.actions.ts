import { props, createAction } from "@ngrx/store";

export const LOGIN_START = '[AUTH] Login Clicked';
export const LOGIN_SUCCESS = '[AUTH] Login Success';
export const LOGIN_FAIL = '[AUTH] Login Failed';

export const loginStart = createAction(
    LOGIN_START,
    props<{email: string; password: string}>()
);

export const loginSucess = createAction(LOGIN_SUCCESS);