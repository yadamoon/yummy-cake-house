import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as AuthActions from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
    constructor(private actions$: Actions) { }

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.login),
            switchMap((action) => {
                return of(action).pipe(
                    map((action) => {
                        return AuthActions.loginSuccess({
                            user: {
                                email: action.email,
                                password: action.password,
                                rememberMe: action.rememberMe,
                                token: action.token
                            }
                        });
                    }),
                    catchError((error) => {
                        return of(AuthActions.loginFailure({ error }));
                    })
                );
            })
        )
    );
}
