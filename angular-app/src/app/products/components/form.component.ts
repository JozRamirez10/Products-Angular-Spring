import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../models/product';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'product-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  @Input() product: Product = {
    id: 0,
    name: 'Teclado',
    description: 'Algo',
    price: 800
  };

  @Output() newProductEvent = new EventEmitter();
    // Se va emitir información de la clase hija (FormComponent) 
    // al padre (ProductComponent)

  onSubmit(productForm: NgForm): void{
    if(productForm.valid){
      this.newProductEvent.emit(this.product)
    }
    productForm.reset();
  }
  clean(): void {
    this.product = new Product();
  }
}
