import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthState } from '../store/reducers/auth.reducer';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<{ auth: AuthState }>, private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.store.select((state) => state.auth.token).pipe(
      map((token) => {
        if (token) {
          return true; // Allow access if token exists
        } else {
          this.router.navigate(['/auth']); // Redirect to signin if no token
          return false;
        }
      })
    );
  }
}
