import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-bakery-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  generalForm: FormGroup;
  emailForm: FormGroup;
  securityForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Initialize forms
    this.generalForm = this.fb.group({
      bakeryName: ['', Validators.required],
      websiteUrl: ['', [Validators.required, Validators.pattern(/https?:\/\/.+\..+/)]],
      contactEmail: ['', [Validators.required, Validators.email]],
      contactPhone: ['', [Validators.required, Validators.pattern(/^\+?[0-9]{7,15}$/)]],
      address: ['', Validators.required],
      currency: ['USD', Validators.required],
      language: ['en', Validators.required],
    });

    this.emailForm = this.fb.group({
      smtpHost: ['', Validators.required],
      smtpPort: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      smtpUser: ['', Validators.required],
      smtpPassword: ['', Validators.required],
      senderName: ['', Validators.required],
      senderEmail: ['', [Validators.required, Validators.email]],
    });

    this.securityForm = this.fb.group({
      requireEmailVerification: [false],
      twoFactorAuth: [false],
      passwordMinLength: [8, [Validators.required, Validators.min(6)]],
      passwordMaxAttempts: [5, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void { }

  // Save General Settings
  saveGeneralSettings(): void {
    if (this.generalForm.valid) {
      const generalSettings = this.generalForm.value;
      console.log('Saving General Settings:', generalSettings);
      // Call your API to save the settings
    } else {
      console.error('General Settings Form is invalid');
    }
  }

  // Save Email Settings
  saveEmailSettings(): void {
    if (this.emailForm.valid) {
      const emailSettings = this.emailForm.value;
      console.log('Saving Email Settings:', emailSettings);
      // Call your API to save the settings
    } else {
      console.error('Email Settings Form is invalid');
    }
  }

  // Test Email Connection
  testEmailConnection(): void {
    if (this.emailForm.valid) {
      const emailSettings = this.emailForm.value;
      console.log('Testing Email Connection with settings:', emailSettings);
      // Call your API to test the email connection
    } else {
      console.error('Email Form is invalid for connection testing');
    }
  }

  // Save Security Settings
  saveSecuritySettings(): void {
    if (this.securityForm.valid) {
      const securitySettings = this.securityForm.value;
      console.log('Saving Security Settings:', securitySettings);
      // Call your API to save the settings
    } else {
      console.error('Security Settings Form is invalid');
    }
  }
}
