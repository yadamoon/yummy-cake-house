import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Product } from '../../../portal/model/product.model';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) { }

  // Get all products
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // Get product by ID
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  // Add a new product
  addCake(product: Product): Observable<any> {
    console.log("product:>>>>>>>>>", product);

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price.toString());
    formData.append('description', product.description);
    formData.append('size', product.size.toString());
    formData.append('category', product.category);
    if (product.image) {
      formData.append('image', product.image);
    }
    console.log("form data:>>", formData.get('name'));
    console.log("form data:>>", formData.get('image'));
    console.log("form data:>>", formData.get('description'));
    console.log("form data:>>", formData.get('size'));
    console.log("form data:>>", formData.get('category'));
    console.log("form data:>>", formData.get('price'));


    return this.http.post(`${this.apiUrl}`, formData);
  }

  // Update an existing product
  updateProduct(id: number, product: Product): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, product);
  }

  // Delete a product
  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
