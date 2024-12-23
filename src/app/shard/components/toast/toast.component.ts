import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
})
export class ToastComponent {
  toasts: { message: string; type: 'info' | 'success' | 'error' }[] = [];

  showToast(message: string, type: 'info' | 'success' | 'error', duration: number = 3000) {
    const toast = { message, type };
    this.toasts.push(toast);

    setTimeout(() => {
      this.toasts.shift();
    }, duration);
  }

  toastClasses(type: 'info' | 'success' | 'error') {
    switch (type) {
      case 'info':
        return 'bg-blue-100 text-blue-700 border border-blue-400';
      case 'success':
        return 'bg-green-100 text-green-700 border border-green-400';
      case 'error':
        return 'bg-red-100 text-red-700 border border-red-400';
      default:
        return '';
    }
  }
}
