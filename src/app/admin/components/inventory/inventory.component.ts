// inventory.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent {
  inventoryItems = [
    { id: 1, name: 'Product 1', quantity: 10, price: 19.99, description: 'Description 1' },
    { id: 2, name: 'Product 2', quantity: 5, price: 29.99, description: 'Description 2' },
    // Add more items as needed
  ];
  newItem = { name: '', quantity: 0, price: 0, description: '' };

  addItem() {
    this.inventoryItems.push({ ...this.newItem, id: Date.now() } as never);
    this.newItem = { name: '', quantity: 0, price: 0, description: '' }; // Reset form
  }

  editItem(item: any) {
    // Logic to edit item
    console.log(item)
  }

  deleteItem(id: number) {
    this.inventoryItems = this.inventoryItems.filter((item: { id: number }) => item.id !== id);
  }
}
