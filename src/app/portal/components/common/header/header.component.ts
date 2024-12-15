import { Component } from '@angular/core';
import { Cake } from '../../../model/cake.model';
import { CartService } from '../../../service/cart/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  cartItems: Cake[] = [];
  itemCount: number = 0;
  subtotal: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {

    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.itemCount = items.length;
      this.subtotal = items.reduce((sum, item) => sum + item.price, 0); // Assuming each Cake has a price property
    });
    this.getCartItems();



  }

  getCartItems(): Cake[] {
    const a = this.cartService.getCartItems();
    console.log("a", a);
    return a;
  }



}
