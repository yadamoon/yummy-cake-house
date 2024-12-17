import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  type: string;
  status: 'Active' | 'Pending' | 'Sold';
  featured: boolean;
  bedrooms: number;
  bathrooms: number;
  area: number;
  agent: string;
  createdAt: Date;
  image: string;
}

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ListsComponent implements OnInit {
  properties: Property[] = [
    {
      id: 1,
      title: 'Modern Luxury Villa',
      location: 'Beverly Hills, CA',
      price: 2500000,
      type: 'Villa',
      status: 'Active',
      featured: true,
      bedrooms: 5,
      bathrooms: 4,
      area: 4200,
      agent: 'Sarah Johnson',
      createdAt: new Date('2024-01-15'),
      image: 'assets/images/properties/property-1.jpg'
    },
    // Add more properties as needed
  ];

  selectedProperties: number[] = [];
  searchTerm: string = '';
  filterStatus: string = 'all';
  sortBy: string = 'newest';

  ngOnInit(): void {
    // Initialize any data if needed
  }

  togglePropertySelection(id: number) {
    const index = this.selectedProperties.indexOf(id);
    if (index === -1) {
      this.selectedProperties.push(id);
    } else {
      this.selectedProperties.splice(index, 1);
    }
  }

  toggleAllSelection() {
    if (this.selectedProperties.length === this.properties.length) {
      this.selectedProperties = [];
    } else {
      this.selectedProperties = this.properties.map(p => p.id);
    }
  }

  deleteSelected() {
    if (confirm('Are you sure you want to delete the selected properties?')) {
      this.properties = this.properties.filter(p => !this.selectedProperties.includes(p.id));
      this.selectedProperties = [];
    }
  }

  toggleFeatured(property: Property) {
    property.featured = !property.featured;
  }

  get filteredProperties() {
    return this.properties
      .filter(p => {
        const matchesSearch = p.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          p.location.toLowerCase().includes(this.searchTerm.toLowerCase());
        const matchesStatus = this.filterStatus === 'all' || p.status.toLowerCase() === this.filterStatus.toLowerCase();
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        switch (this.sortBy) {
          case 'price-high':
            return b.price - a.price;
          case 'price-low':
            return a.price - b.price;
          case 'oldest':
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          default: // newest
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
      });
  }
}
