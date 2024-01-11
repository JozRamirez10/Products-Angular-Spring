import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  products: Product[] = [];
  productSelected: Product = new Product();

  // Constructor
  // Inyecta en el constructor el service
  constructor(private service: ProductService) {}

  // Método que se ejecuta al iniciar la app
  ngOnInit(): void {
    this.service.findAll().subscribe(products => this.products = products);
  } // Asigna los products obtenidos del repositorio a la variable products de este component

  addProduct(product: Product){
    //product.id = new Date().getTime();
    //this.products.push(product);

    if(product.id > 0){ // Update
      this.service.update(product).subscribe(productUpdate => { // Lo actualiza en la bd
        this.products = this.products.map(prod => { // Lo actualiza en la lista
          if(prod.id == product.id){
            return {...productUpdate};
          }
          return prod;
        });
      });
    }else{ // Create 
      this.service.create(product).subscribe(productNew => { // Lo crea en la bd
        this.products = [... this.products, {...productNew}]; // Actualiza en la lista de productos
      });
    }
    this.productSelected = new Product();
  }

  onRemoveProduct(id: number): void{
    this.service.remove(id).subscribe(() => {
      this.products = this.products.filter(product => product.id != id)
    }); 
  }

  onUpdateProduct(productRow: Product): void{
    this.productSelected = {...productRow};
  }

}
