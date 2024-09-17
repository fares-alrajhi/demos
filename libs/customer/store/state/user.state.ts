import { createAction, props } from '@ngrx/store';

export enum Statuses {
    UNINITIALIZED = 'uninitialized',
    LOADING = 'loading',
    LOADED = 'loaded',
  }

export interface UserState {
    data: object;
    loading: boolean;
    error: string;
}

export const initialState: UserState = {
    data: {},
    loading: false,
    error: ''
};