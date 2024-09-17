import { createSelector } from '@ngrx/store';

const selectLogin = (state: any) => state;

export const selectToken = createSelector(
  selectLogin,
  (state) => state.user
);

export const selectName = createSelector(
    selectLogin,
    (state) => state.user.name
  );

export const selectError = createSelector(
  selectLogin,
  (state) => state.error
);

export const selectIsLoading = createSelector(
  selectLogin,
  (state) => state.isLoading
);

export const USER_STATE_NAME = 'user';