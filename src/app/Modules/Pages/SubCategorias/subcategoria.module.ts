import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormSubCategoriaComponent } from './form-sub-categoria/form-sub-categoria.component';
import { TableSubCategoriaComponent } from './table-sub-categoria/table-sub-categoria.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SubCategoriasComponent } from './sub-categorias.component';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [
    SubCategoriasComponent,
    FormSubCategoriaComponent,
    TableSubCategoriaComponent
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
    MatSelectModule
  ]
})
export class SubcategoriaModule { }
