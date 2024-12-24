import { routes } from './../../../app.routes';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { User } from '../model/user.modal';
import { ToastComponent } from '../../../shard/components/toast/toast.component';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-signup',

  templateUrl: './signup.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, ToastComponent]
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  isLoading = false;
  showPassword = false;
  showConfirmPassword = false;
  userType: 'customer' | 'agent' = 'customer';

  @ViewChild(ToastComponent) toast!: ToastComponent;


  constructor(private fb: FormBuilder, private authService: AuthService, private routes: Router) {
    this.signupForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        // Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ]],
      confirmPassword: ['', Validators.required],
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  setUserType(type: 'customer' | 'agent') {
    this.userType = type;
  }

  togglePasswordVisibility(field: 'password' | 'confirmPassword') {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.isLoading = true;
      const user: User = {

        fullName: this.signupForm.value.fullName,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password
      };
      this.authService.register(user).subscribe(
        (response) => {
          this.toast.showToast('Registration successful!', 'success');
          setTimeout(() => {
            this.routes.navigate(['/signin']);
          }, 2000);
          this.isLoading = false;
        },
        (error) => {

          this.toast.showToast('Registration failed!', 'error');
          this.isLoading = false;
        }
      );
    } else {
      this.signupForm.markAllAsTouched();
    }
  }

  get fullName() { return this.signupForm.get('fullName'); }
  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }
  get confirmPassword() { return this.signupForm.get('confirmPassword'); }

  ngOnInit(): void {
    console.log('Sign-up page initialized.');
  }
}
