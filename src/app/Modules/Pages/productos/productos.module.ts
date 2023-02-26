import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosComponent } from '../productos/productos.component';
import { MatDividerModule } from '@angular/material/divider';



@NgModule({
  declarations: [
    ProductosComponent
  ],
  imports: [
    CommonModule,
    MatDividerModule
  ]
})
export class ProductosModule { }
