import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoComprasComponent } from './carrito-compras.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';





@NgModule({
  declarations: [
    CarritoComprasComponent
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSortModule,
    MatDatepickerModule,
    MatRadioModule
  ]
})
export class CarritoComprasModule { }
