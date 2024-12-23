import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Order } from '../model/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  placeOrder(order: Order): Observable<void> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Authorization token is missing!');
      throw new Error('Authorization token is required to place an order.');
    }

    console.log('Placing order:', order);

    return this.http.post<void>(`${this.baseUrl}/orders`, order, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
  }
}
