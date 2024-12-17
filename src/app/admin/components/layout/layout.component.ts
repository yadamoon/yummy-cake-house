import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './layout.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class AdminLayoutComponent {
  @ViewChild('userMenu') userMenu!: ElementRef;

  isSidebarOpen = true;
  isUserMenuOpen = false;

  // constructor(private authService: AuthService) { }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.userMenu.nativeElement.contains(event.target)) {
      this.isUserMenuOpen = false;
    }
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  // logout() {
  //   // Implement logout logi
  //   this.authService.logout();


  // }
}
