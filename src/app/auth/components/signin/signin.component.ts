import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { AuthState } from '../../../store/reducers/auth.reducer';
import { Store } from '@ngrx/store';
import { login } from '../../../store/actions/auth.actions';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']

})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  showPassword = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private store: Store<{ auth: AuthState }>, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],

    });
  }

  ngOnInit(): void {
    console.log('Sign in page loaded.');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;


      this.authService.login({ email, password }).subscribe(
        (response) => {
          console.log('Login successful:', response);

          // store token in session storage
          localStorage.setItem('token', response.token);
          console.log('Token:', response.token);
          this.store.dispatch(login({
            email, password, rememberMe: false,
            token: response.token
          }));

          // Redirect to the desired page after successful login
          this.router.navigate(['/home']);
          console.log("finaly successful ")


          // Redirect to the desired page after successful login


          // Handle successful login
        },
        (error) => {
          console.error('Login error:', error);
          // Handle login error
        }
      );
    }
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Getter methods for form controls
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
}
