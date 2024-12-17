import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  type: 'Customer' | 'Agent' | 'Admin';
  status: 'Active' | 'Inactive' | 'Pending';
  joinDate: Date;
  lastLogin: Date;
  avatar: string;
  properties?: number;
  verified: boolean;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class UsersComponent implements OnInit {
  users: User[] = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '+1 (234) 567-8901',
      type: 'Customer',
      status: 'Active',
      joinDate: new Date('2024-01-15'),
      lastLogin: new Date('2024-02-20'),
      avatar: 'assets/images/users/user-1.jpg',
      verified: true
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      phone: '+1 (234) 567-8902',
      type: 'Agent',
      status: 'Active',
      joinDate: new Date('2023-12-10'),
      lastLogin: new Date('2024-02-19'),
      avatar: 'assets/images/users/user-2.jpg',
      properties: 15,
      verified: true
    },
    // Add more users as needed
  ];

  selectedUsers: number[] = [];
  searchTerm: string = '';
  filterType: string = 'all';
  filterStatus: string = 'all';
  sortBy: string = 'newest';

  ngOnInit(): void {
    // Initialize data if needed
  }

  toggleUserSelection(id: number) {
    const index = this.selectedUsers.indexOf(id);
    if (index === -1) {
      this.selectedUsers.push(id);
    } else {
      this.selectedUsers.splice(index, 1);
    }
  }

  toggleAllSelection() {
    if (this.selectedUsers.length === this.users.length) {
      this.selectedUsers = [];
    } else {
      this.selectedUsers = this.users.map(u => u.id);
    }
  }

  deleteSelected() {
    if (confirm('Are you sure you want to delete the selected users?')) {
      this.users = this.users.filter(u => !this.selectedUsers.includes(u.id));
      this.selectedUsers = [];
    }
  }

  updateUserStatus(user: User, status: 'Active' | 'Inactive' | 'Pending') {
    user.status = status;
  }

  get filteredUsers() {
    return this.users
      .filter(u => {
        const matchesSearch = u.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          u.email.toLowerCase().includes(this.searchTerm.toLowerCase());
        const matchesType = this.filterType === 'all' || u.type.toLowerCase() === this.filterType.toLowerCase();
        const matchesStatus = this.filterStatus === 'all' || u.status.toLowerCase() === this.filterStatus.toLowerCase();
        return matchesSearch && matchesType && matchesStatus;
      })
      .sort((a, b) => {
        switch (this.sortBy) {
          case 'name':
            return a.name.localeCompare(b.name);
          case 'oldest':
            return new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime();
          default: // newest
            return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime();
        }
      });
  }

  exportUsers() {
    // Implement export functionality
    console.log('Exporting users...');
  }
}
