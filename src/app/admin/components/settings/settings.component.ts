import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
// export class SettingsComponent {
//   generalForm: FormGroup;
//   emailForm: FormGroup;
//   securityForm: FormGroup;
//   notificationSettings = {
//     emailNotifications: true,
//     propertyUpdates: true,
//     newInquiries: true,
//     marketingEmails: false,
//     systemAlerts: true
//   };

//   constructor(private fb: FormBuilder) {
//     this.generalForm = this.fb.group({
//       siteName: ['RealEstateHub', Validators.required],
//       siteUrl: ['https://realestatehub.com', [Validators.required, Validators.pattern('https?://.+')]],
//       contactEmail: ['info@realestatehub.com', [Validators.required, Validators.email]],
//       contactPhone: ['+1 (234) 567-8900', Validators.required],
//       address: ['123 Real Estate Ave, Suite 100, New York, NY 10001', Validators.required],
//       currency: ['USD', Validators.required],
//       language: ['en', Validators.required]
//     });

//     this.emailForm = this.fb.group({
//       smtpHost: ['smtp.example.com', Validators.required],
//       smtpPort: ['587', [Validators.required, Validators.pattern('^[0-9]+$')]],
//       smtpUser: ['smtp@example.com', [Validators.required, Validators.email]],
//       smtpPassword: ['', Validators.required],
//       senderName: ['RealEstateHub', Validators.required],
//       senderEmail: ['noreply@realestatehub.com', [Validators.required, Validators.email]]
//     });

//     this.securityForm = this.fb.group({
//       requireEmailVerification: [true],
//       twoFactorAuth: [false],
//       passwordMinLength: ['8', [Validators.required, Validators.min(6)]],
//       sessionTimeout: ['60', [Validators.required, Validators.min(15)]],
//       maxLoginAttempts: ['5', [Validators.required, Validators.min(3)]]
//     });
//   }

//   saveGeneralSettings() {
//     if (this.generalForm.valid) {
//       console.log('Saving general settings:', this.generalForm.value);
//       // Implement save functionality
//     }
//   }

//   saveEmailSettings() {
//     if (this.emailForm.valid) {
//       console.log('Saving email settings:', this.emailForm.value);
//       // Implement save functionality
//     }
//   }

//   saveSecuritySettings() {
//     if (this.securityForm.valid) {
//       console.log('Saving security settings:', this.securityForm.value);
//       // Implement save functionality
//     }
//   }

//   saveNotificationSettings() {
//     console.log('Saving notification settings:', this.notificationSettings);
//     // Implement save functionality
//   }

//   testEmailConnection() {
//     if (this.emailForm.valid) {
//       console.log('Testing email connection...');
//       // Implement email test functionality
//     }
//   }
// }
export class SettingsComponent {
  generalForm: FormGroup;
  emailForm: FormGroup;
  securityForm: FormGroup;
  notificationSettings = {
    emailNotifications: true,
    patientUpdates: true,
    newAppointments: true,
    medicalAlerts: true,
    systemAlerts: true
  };

  constructor(private fb: FormBuilder) {
    this.generalForm = this.fb.group({
      hospitalName: ['Acme Hospital', Validators.required],
      hospitalUrl: ['https://acmehospital.com', [Validators.required, Validators.pattern('https?://.+')]],
      contactEmail: ['info@acmehospital.com', [Validators.required, Validators.email]],
      contactPhone: ['+1 (234) 567-8900', Validators.required],
      address: ['123 Hospital Ave, Suite 100, New York, NY 10001', Validators.required],
      currency: ['USD', Validators.required],
      language: ['en', Validators.required]
    });

    this.emailForm = this.fb.group({
      smtpHost: ['smtp.example.com', Validators.required],
      smtpPort: ['587', [Validators.required, Validators.pattern('^[0-9]+$')]],
      smtpUser: ['smtp@example.com', [Validators.required, Validators.email]],
      smtpPassword: ['', Validators.required],
      senderName: ['Acme Hospital', Validators.required],
      senderEmail: ['noreply@acmehospital.com', [Validators.required, Validators.email]]
    });

    this.securityForm = this.fb.group({
      requireEmailVerification: [true],
      twoFactorAuth: [false],
      passwordMinLength: ['8', [Validators.required, Validators.min(6)]],
      sessionTimeout: ['60', [Validators.required, Validators.min(15)]],
      maxLoginAttempts: ['5', [Validators.required, Validators.min(3)]]
    });
  }

  saveGeneralSettings() {
    if (this.generalForm.valid) {
      console.log('Saving general settings:', this.generalForm.value);
      // Implement save functionality
    }
  }

  saveEmailSettings() {
    if (this.emailForm.valid) {
      console.log('Saving email settings:', this.emailForm.value);
      // Implement save functionality
    }
  }

  saveSecuritySettings() {
    if (this.securityForm.valid) {
      console.log('Saving security settings:', this.securityForm.value);
      // Implement save functionality
    }
  }

  saveNotificationSettings() {
    console.log('Saving notification settings:', this.notificationSettings);
    // Implement save functionality
  }

  testEmailConnection() {
    if (this.emailForm.valid) {
      console.log('Testing email connection...');
      // Implement email test functionality
    }
  }
}
