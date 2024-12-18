import { addCake } from './../../../../store/actions/cart.actions';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Cake } from '../../../model/cake.model';
import { CartService } from '../../../service/cart/cart.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartState } from '../../../../store/reducers/cart.reducer';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cartItems$: Observable<Cake[]>; // Correctly typed observable
  itemCount: number = 0;
  subtotal: number = 0;


  // constructor(private cartService: CartService, private store: Store<{ cart: { items: any } }>) {
  //   this.counter$ = this.store.select('cart');
  //   console.log("header comp :> ", this.counter$);

  // }

  constructor(private store: Store<{ cart: CartState }>) {
    // Select items from the cart slice
    this.cartItems$ = this.store.select((state) => state.cart.items);
  }


  // ngOnInit(): void {
  //   console.log("counter", this.counter$);
  //   this.cartService.cartItems$.subscribe(items => {
  //     this.cartItems = items;
  //     this.itemCount = items.length;
  //     this.subtotal = items.reduce((sum, item) => sum + item.price, 0); // Assuming each Cake has a price property
  //   });
  //   this.getCartItems();



  // }

  // getCartItems(): Cake[] {
  //   const a = this.cartService.getCartItems();
  //   this.cartItems = a;
  //   console.log("a", a);
  //   return a;
  // }

  // addCake(cake: any) {
  //   console.log("length", this.cartItems.length);
  //   this.store.dispatch(addCake({ cake }));

  //   console.log(this.counter$)
  // }
  ngOnInit(): void {
    // Subscribe to cartItems$ to update itemCount and subtotal
    this.cartItems$.subscribe((items) => {
      this.itemCount = items.length;
      console.log("items count :>>", this.itemCount);

      this.subtotal = items.reduce((sum, item) => sum + item.price, 0); // Assuming each Cake has a price property
    });
  }

  addCake(cake: Cake) {
    this.store.dispatch(addCake({ cake })); // Dispatch the action
  }


}
