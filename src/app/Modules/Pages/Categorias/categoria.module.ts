import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormCategoriaComponent } from './form-categoria/form-categoria.component';
import { TableCategoriaComponent } from './table-categoria/table-categoria.component';
import { CategoriasComponent } from './categorias.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';




@NgModule({
  declarations: [
    FormCategoriaComponent,
    TableCategoriaComponent,
    CategoriasComponent
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule
  ]
})
export class CategoriaModule { }
