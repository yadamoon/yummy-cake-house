import { AuthService } from './../../../../auth/service/auth.service';
import { addCake, clearCart } from './../../../../store/actions/cart.actions';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Cake } from '../../../model/cake.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartState } from '../../../../store/reducers/cart.reducer';
import { OrderService } from '../../../service/order.service';
import { Order } from '../../../model/order.model';
import { ToastComponent } from '../../../../shard/components/toast/toast.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ToastComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cartItems$: Observable<Cake[]>; // Observable for cart items
  itemCount: number = 0; // Number of items in the cart
  subtotal: number = 0; // Total cost of items in the cart
  allItems: Cake[] = []; // Array to store cart items

  @ViewChild(ToastComponent) toast!: ToastComponent;
  constructor(
    private store: Store<{ cart: CartState }>,
    private authService: AuthService,
    private orderService: OrderService
  ) {
    // Select items from the cart slice
    this.cartItems$ = this.store.select((state) => state.cart.items);
  }

  ngOnInit(): void {
    // Subscribe to cartItems$ to update itemCount and subtotal
    this.cartItems$.subscribe((items) => {
      this.itemCount = items.length;
      // add items to all items
      this.allItems = this.allItems.concat(items);
      // sum the total price for all quantity 
      this.subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

    });
  }

  addCake(cake: Cake) {
    this.store.dispatch(addCake({ cake })); // Dispatch the action to add a cake
  }

  // pay() {
  //   this.cartItems$.subscribe((items) => {
  //     // if (items.length === 0) {
  //     //   alert('Your cart is empty. Please add items to proceed with payment.');
  //     //   return;
  //     // }

  //     // Create an Order object
  //     const order: Order = {
  //       products: items.map((item) => ({
  //         product: item.id, // Assuming `item.name` is the product name
  //         quantity: 1, // Adjust quantity as required
  //       })),
  //       dueDate: new Date().toISOString(), // Set the due date to now
  //       downPayment: this.subtotal, // Use the calculated subtotal as the down payment
  //     };
  //     console.log("order>>>>>>>>>>>>>>>>", order);

  //     // Call the OrderService to place the order
  //     this.orderService.placeOrder(order).subscribe({
  //       next: (response) => {
  //         console.log('Order placed successfully:', response);
  //         // Optionally, you can clear the cart after successful payment
  //         this.store.dispatch(clearCart());
  //       },
  //       error: (error) => {
  //         console.error('Error placing order:', error);
  //       },
  //     });
  //   });

  // }
  pay() {
    // this.cartItems$.subscribe((items) => {
    // if (!items.length) {
    //   alert('Your cart is empty. Please add items to proceed with payment.');
    //   return;
    // }

    // Create an Order object
    const order: Order = {
      // products: items.map((item) => ({
      //   product: item.id, // Use the name or another string field
      //   quantity: 1, // Adjust quantity as required
      // })),
      products: this.allItems.map((item) => ({
        product: item.id, // Use the name or another string field
        quantity: 1, // Adjust quantity as required
      })),
      dueDate: new Date().toISOString(), // Current date
      downPayment: this.subtotal, // Calculated subtotal
    };

    console.log('Order object:', order);

    // Call the OrderService to place the order
    this.orderService.placeOrder(order).subscribe({
      next: () => {


        this.store.dispatch(clearCart()); // Clear the cart after success
        this.toast.showToast('Order placed successfully!', 'success');
      },
      error: (err) => {
        this.toast.showToast('An error occurred while placing the order. Please try again.', 'error');

      },
    });
    // this.orderService.placeOrder(order).subscribe(order => {
    //   console.log('Order placed successfully:', order);
    //   this.store.dispatch(clearCart()); // Clear the cart after success
    // })
    // });
  }




  logout() {
    this.authService.logout(); // Logout user
  }
}
