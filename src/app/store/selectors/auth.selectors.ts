import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../reducers/auth.reducer';


export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUser = createSelector(
    selectAuthState,
    (state) => state.user
);

export const selectIsLoading = createSelector(
    selectAuthState,
    (state) => state.isLoading
);

export const selectError = createSelector(
    selectAuthState,
    (state) => state.error
);
