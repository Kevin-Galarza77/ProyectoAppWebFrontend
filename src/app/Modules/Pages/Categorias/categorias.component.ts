import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormCategoriaComponent } from './form-categoria/form-categoria.component';
import { TableCategoriaComponent } from './table-categoria/table-categoria.component';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent {

  @ViewChild(TableCategoriaComponent) tableCategoria!:TableCategoriaComponent;

  constructor(public dialog: MatDialog){

  }


  createEditCategoria(){
    const dialogref = this.dialog.open(FormCategoriaComponent, {
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
