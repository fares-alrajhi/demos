import { Action, createReducer, on } from "@ngrx/store";
import { initialState, UserState, Statuses } from "../state/user.state";
import * as userActions from "../actions/user.actions";

export const UserReducer = createReducer(
  initialState,
  // case 1: success
  on(userActions.LoginSuccess, (state, { token, name }) => {     
    return ({
      ...state,
      token,
      name
    })
  }),
  // case 2: failure
  on(userActions.LoginFail, (state) => ({
    state,
    loading: false,
    error: '',
    data: {},
  })),

  // case 1: success
  on(userActions.ProfileSuccess, (state, { profile }) => {     
    return ({
      ...state,
      profile,
    })
  }),
  // case 2: failure
  on(userActions.Profile, (state) => ({
    state,
    loading: false,
    error: '',
    data: {},
  }))
);