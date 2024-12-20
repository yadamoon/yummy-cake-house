import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { User } from '../model/user.modal';

@Component({
  selector: 'app-signup',

  templateUrl: './signup.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule]
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  isLoading = false;
  showPassword = false;
  showConfirmPassword = false;
  userType: 'customer' | 'agent' = 'customer';

  constructor(private fb: FormBuilder, private authService: AuthService) {
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
          console.log('Registration successful:', response);
          this.isLoading = false;
        },
        (error) => {
          console.error('Registration failed:', error);
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
