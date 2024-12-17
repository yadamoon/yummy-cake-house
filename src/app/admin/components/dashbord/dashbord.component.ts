import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Activity {
  id: number;
  icon: string;
  description: string;
  time: string;
}

interface Cake {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  status: string;
  statusClass: string;
}

@Component({
  selector: 'app-cake-dashboard',
  templateUrl: './dashbord.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class CakeDashboardComponent {
  recentActivities: Activity[] = [
    { id: 1, icon: 'fas fa-shopping-cart', description: 'New cake order placed.', time: '2 minutes ago' },
    { id: 2, icon: 'fas fa-user', description: 'New customer registered.', time: '10 minutes ago' },
    { id: 3, icon: 'fas fa-star', description: 'Review received for Chocolate Cake.', time: '1 hour ago' },
    { id: 4, icon: 'fas fa-envelope', description: 'Customer inquiry about birthday cakes.', time: '3 hours ago' },
  ];

  featuredCakes: Cake[] = [
    { id: 1, title: 'Chocolate Cake', description: 'Rich and moist chocolate layers.', price: 25, image: 'assets/images/cakes/chocolate-cake.jpg', status: 'Available', statusClass: 'bg-green-100 text-green-800' },
    { id: 2, title: 'Vanilla Sponge Cake', description: 'Light and fluffy vanilla cake.', price: 20, image: 'assets/images/cakes/vanilla-cake.jpg', status: 'Limited', statusClass: 'bg-yellow-100 text-yellow-800' },
    { id: 3, title: 'Strawberry Shortcake', description: 'Fresh strawberries with cream.', price: 30, image: 'assets/images/cakes/strawberry-cake.jpg', status: 'Sold Out', statusClass: 'bg-red-100 text-red-800' },
  ];
}
