import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';

export interface AuthState {
    token: string | null;
    user: any;
    error: string | null;
    isLoading: boolean;
}

export const initialState: AuthState = {

    token: localStorage.getItem('token'),
    user: null,
    error: null,
    isLoading: false,
};

export const authReducer = createReducer(
    initialState,
    // on(AuthActions.login, (state) => ({ ...state, loading: true, error: null, token: state.token })),
    on(AuthActions.login, (state, { token }) => ({ ...state, loading: true, error: null, token: token })),
    on(AuthActions.loginSuccess, (state, { user }) => {
        localStorage.setItem('token', user.token); // Save token to localStorage
        return { ...state, loading: true, token: user.token, user };
    }),
    // on(AuthActions.loginFailure, (state, { error }) => ({ ...state, loading: false, error }))
    // on(AuthActions.login, (state) => ({
    //     ...state,
    //     isLoading: true,
    //     error: null,
    // })),
    // on(AuthActions.loginSuccess, (state, { user }) => ({
    //     ...state,
    //     user,
    //     isLoading: false,
    //     error: null,
    // })),
    // on(AuthActions.loginFailure, (state, { error }) => ({
    //     ...state,
    //     isLoading: false,
    //     error,
    // }))
);
