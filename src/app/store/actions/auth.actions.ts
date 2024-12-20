import { createAction, props } from '@ngrx/store';

interface User {
    email: string;
    password: string;
    token: string;
    rememberMe: boolean;
}

export const login = createAction(
    '[Auth] Login',
    props<{ email: string; password: string; rememberMe: boolean, token: string }>()
);

export const loginSuccess = createAction(
    '[Auth] Login Success',
    props<{ user: any }>() // Replace `any` with your user model
);

export const loginFailure = createAction(
    '[Auth] Login Failure',
    props<{ error: string }>()
);
