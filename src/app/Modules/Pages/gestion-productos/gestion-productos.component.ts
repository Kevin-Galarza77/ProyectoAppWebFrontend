import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormProductosComponent } from './form-productos/form-productos.component';
import { TableProductosComponent } from './table-productos/table-productos.component';

@Component({
  selector: 'app-gestion-productos',
  templateUrl: './gestion-productos.component.html',
  styleUrls: ['./gestion-productos.component.css']
})
export class GestionProductosComponent  {

  @ViewChild(TableProductosComponent) tableProductos!:TableProductosComponent;

  constructor(public dialog: MatDialog){

  }


  createEditCategoria(){
    const dialogref = this.dialog.open(FormProductosComponent, {
      height: 'auto',
      width: '50%',
      minWidth: '300px',
      minHeight: '250px'
    });

    dialogref.afterClosed().subscribe(
      result=>{
        if (result) {
          this.tableProductos.getAllProductos();
        }
      }
    );

  }

}
