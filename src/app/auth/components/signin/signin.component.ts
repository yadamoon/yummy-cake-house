import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { AuthState } from '../../../store/reducers/auth.reducer';
import { Store } from '@ngrx/store';
import { login } from '../../../store/actions/auth.actions';
import { ToastComponent } from '../../../shard/components/toast/toast.component';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, ToastComponent],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  showPassword = false;

  @ViewChild(ToastComponent) toast!: ToastComponent;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private store: Store<{ auth: AuthState }>,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    console.log('Sign in page loaded.');


    // check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/home']);
    }
    else {
      console.log("not logged in");
      this.router.navigate(['/']);
    }
  }


  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      this.authService.login({ email, password }).subscribe(
        (response) => {
          // Show toast on successful login
          this.toast.showToast('Login successful!', 'success');

          // Store token in local storage
          localStorage.setItem('token', response.token);

          // Dispatch login action to the store
          this.store.dispatch(
            login({
              email,
              password,
              rememberMe: false,
              token: response.token,
            })
          );


          setTimeout(() => {
            this.router.navigate(['/home'], { state: { toastMessage: 'Login successful!', toastType: 'success' } });
          }, 500);

          // Navigate to home with state

        },
        (error) => {
          // Show toast on failed login
          this.toast.showToast('Login failed!', 'error');
          console.error('Login error:', error);
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
