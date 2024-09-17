import { Action, ActionReducer } from '@ngrx/store';
import { UserState } from './state/user.state';
import { AuthEffects } from './effects/user.effects';
import { UserReducer } from './reducers/user.reducers';

export interface AppState {
    data: UserState
}
  
  export interface AppStore {
    data: ActionReducer<UserState, Action>;
  }
  
  export const appStore: AppStore = {
    data: UserReducer, 
  }
  
  export const appEffects = [AuthEffects];