import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  products = [
    { id: 1, name: 'Product 1', category: 'Category 1', price: 10, imageUrl: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Product 2', category: 'Category 2', price: 20, imageUrl: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Product 3', category: 'Category 1', price: 30, imageUrl: 'https://via.placeholder.com/150' },
  ];
  newProduct = { name: '', category: '', price: 0, imageUrl: '' };
  imagePreview: string | null = null;

  addProduct() {
    this.products.push({ ...this.newProduct, id: Date.now() } as never);
    this.newProduct = { name: '', category: '', price: 0, imageUrl: '' }; // Reset form
    this.imagePreview = null;
  }
  previewImage() {
    this.imagePreview = this.newProduct.imageUrl; // Set image preview to the input URL
  }

  editProduct(product: any) {
    // Logic to edit product
  }

  deleteProduct(id: number) {
    this.products = this.products.filter((product: any) => product.id !== id);
  }
}
