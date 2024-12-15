import { Injectable } from '@angular/core';
import { Cake } from '../../model/cake.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: Cake[] = [];
  private cartItemsSubject = new BehaviorSubject<Cake[]>(this.cartItems);
  cartItems$ = this.cartItemsSubject.asObservable();



  addToCart(cake: Cake): void {
    console.log("cake added to cart", cake);
    // this.cartItems.push(cake);

    // this.cartItemsSubject.next(this.cartItems);

    // added to local storage
    const existingCartItems = localStorage.getItem('cartItems');
    let cartItems: Cake[] = [];
    if (existingCartItems) {
      cartItems = JSON.parse(existingCartItems);
    }
    cartItems.push(cake);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    this.cartItemsSubject.next(this.cartItems);
    console.log("cart items", this.cartItems);


  }

  removeFromCart(cake: Cake): void {
    this.cartItems = this.cartItems.filter(item => item.id !== cake.id);
    this.cartItemsSubject.next(this.cartItems);
  }

  clearCart(): void {
    this.cartItems = [];
    this.cartItemsSubject.next(this.cartItems);
  }
  getCartItems(): Cake[] {
    //  get from local storage
    const existingCartItems = localStorage.getItem('cartItems');
    let cartItems: Cake[] = [];
    if (existingCartItems) {
      cartItems = JSON.parse(existingCartItems);
    }
    return cartItems;
  }
}
