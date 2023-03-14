import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TableCategoriaComponent } from '../Categorias/table-categoria/table-categoria.component'; 
import { FormSubCategoriaComponent } from './form-sub-categoria/form-sub-categoria.component';

@Component({
  selector: 'app-sub-categorias',
  templateUrl: './sub-categorias.component.html',
  styleUrls: ['./sub-categorias.component.css']
})
export class SubCategoriasComponent  {

  @ViewChild(TableCategoriaComponent) tableCategoria!:TableCategoriaComponent;

  constructor(public dialog: MatDialog){

  }


  createEditSubCategoria(){
    const dialogref = this.dialog.open(FormSubCategoriaComponent, {
      height: 'auto',
      width: '50%',
      minWidth: '300px',
      minHeight: '250px'
    });

    dialogref.afterClosed().subscribe(
      result=>{
        if (result) {
          this.tableCategoria.getAllCategorys();
        }
      }
    );

  }

}
