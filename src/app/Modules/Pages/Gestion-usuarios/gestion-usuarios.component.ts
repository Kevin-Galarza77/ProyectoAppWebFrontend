import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersFormComponent } from './users-form/users-form.component';
import { UsersTablesComponent } from './users-tables/users-tables.component';

@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.css']
})
export class GestionUsuariosComponent {

  @ViewChild(UsersTablesComponent)  userTable!:UsersTablesComponent;


  constructor(public dialog: MatDialog){
   
  }




  createEditCategoria(){
    const dialogref = this.dialog.open(UsersFormComponent, {
      height: 'auto',
      width: '50%',
      minWidth: '300px',
      minHeight: '250px'
    });

    dialogref.afterClosed().subscribe(
      result=>{
        if (result) {
          this.userTable.getAllUsers();
        }
      }
    );

  }


}
