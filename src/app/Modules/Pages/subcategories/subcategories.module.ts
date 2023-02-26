import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubcategoriesComponent } from './subcategories.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    SubcategoriesComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SubcategoriesModule { }
