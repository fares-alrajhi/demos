import { initalState } from './auth.state'
import { createReducer } from '@ngrx/store';

const _authReducer = createReducer(initalState);

export function AuthReducer(state, action) {
    return _authReducer(state, action);
}