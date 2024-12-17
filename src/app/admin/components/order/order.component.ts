import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../service/order.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-admin-order',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders: any[] = [];
  newOrder = {
    customerName: '',
    totalAmount: 0,
    status: 'Pending'
  };
  isCreateOrderModalOpen = false;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.getOrders();
  }

  // Fetch orders from the server
  getOrders() {
    this.orderService.getOrders().subscribe(
      (data) => {
        this.orders = data;
      },
      (error) => {
        console.error('Error fetching orders:', error);

      }
    );
  }

  // Open the modal to create a new order
  openCreateOrderModal() {
    this.isCreateOrderModalOpen = true;
  }

  // Close the create order modal
  closeCreateOrderModal() {
    this.isCreateOrderModalOpen = false;
    this.newOrder = { customerName: '', totalAmount: 0, status: 'Pending' }; // Reset the form
  }

  // Create a new order and submit to the server
  createOrder() {
    if (this.newOrder.customerName && this.newOrder.totalAmount > 0) {
      this.orderService.createOrder(this.newOrder).subscribe(
        (response) => {
          // this.toastr.success('Order created successfully!', 'Success');
          this.getOrders(); // Refresh the orders list
          this.closeCreateOrderModal(); // Close the modal after creating the order
        },
        (error) => {
          console.error('Error creating order:', error);
          // this.toastr.error('Failed to create order.', 'Error');
        }
      );
    } else {
      // this.toastr.warning('Please provide valid customer name and total amount.', 'Warning');
    }
  }

  // View details of a specific order
  viewOrderDetails(orderId: number) {
    this.orderService.getOrderById(orderId).subscribe(
      (data) => {
        // Handle the view logic, such as opening a detailed modal
        console.log('Order details:', data);
      },
      (error) => {
        console.error('Error fetching order details:', error);
        // this.toastr.error('Failed to fetch order details.', 'Error');
      }
    );
  }

  // Edit an existing order (You may open a modal and pre-fill the data for editing)
  editOrder(orderId: number) {
    this.orderService.getOrderById(orderId).subscribe(
      (data) => {
        // Pre-fill data and open a modal to edit the order
        this.newOrder = data;
        this.openCreateOrderModal();
      },
      (error) => {
        console.error('Error fetching order data for edit:', error);
        // this.toastr.error('Failed to fetch order data for editing.', 'Error');
      }
    );
  }

  // Delete an order
  deleteOrder(orderId: number) {
    if (confirm('Are you sure you want to delete this order?')) {
      this.orderService.deleteOrder(orderId).subscribe(
        (response) => {
          // this.toastr.success('Order deleted successfully!', 'Success');
          this.getOrders(); // Refresh the orders list
        },
        (error) => {
          console.error('Error deleting order:', error);
          // this.toastr.error('Failed to delete order.', 'Error');
        }
      );
    }
  }
}
