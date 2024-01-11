import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: "Mesa comedor",
      description: "Excelente mesa para el comedor",
      price: 700
    },
    {
      id: 2,
      name: "Teclado mecánico",
      description: "Teclado muy cómodo",
      price: 500
    }
  ];

  private url: string = 'http://localhost:8080/products';

  // Inyección del htppClient
  constructor(private http: HttpClient) { }

  findAll(): Observable<Product[]> {
    //return of(this.products); // Convierte el arreglo a un tipo Observable
    return this.http.get(this.url).pipe(
      map((response: any) => response._embedded.products as Product[])
    );
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.url, product);
  }

  update(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.url}/${product.id}`, product);
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

}
