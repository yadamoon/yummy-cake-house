import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../components/model/user.modal';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient, private router: Router) { }

  register(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, user);
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, credentials);
  }
  // logout remove token from local storage and navigate to login page and rmv form store and navigate to login page
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);

  }
}
