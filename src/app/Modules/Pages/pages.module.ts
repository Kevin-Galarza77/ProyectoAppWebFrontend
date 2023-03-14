import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages.routes';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { HomeComponent } from './home/home.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { ReactiveFormsModule } from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { FormSubCategoriaComponent } from './SubCategorias/form-sub-categoria/form-sub-categoria.component';
import { TableSubCategoriaComponent } from './SubCategorias/table-sub-categoria/table-sub-categoria.component';



@NgModule({
  declarations: [
    HomeComponent,
    ChangePasswordComponent,
    FormSubCategoriaComponent,
    TableSubCategoriaComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,
    MatMenuModule,
    MatButtonModule
  ]
})
export class PagesModule { }
