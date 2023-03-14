import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionProductosComponent } from '../gestion-productos/gestion-productos.component';
import { FormProductosComponent } from './form-productos/form-productos.component';
import { TableProductosComponent } from './table-productos/table-productos.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';



@NgModule({
  declarations: [
    GestionProductosComponent,
    FormProductosComponent,
    TableProductosComponent
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
    MatSortModule
  ]
})
export class GestionProductosModule { }
