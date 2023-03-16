import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductosService } from 'src/app/Services/productos.service';
import { UsuariosService } from 'src/app/Services/usuarios.service';
import Swal from 'sweetalert2';
import { FormProductosComponent } from '../../gestion-productos/form-productos/form-productos.component';
import { UsersFormComponent } from '../users-form/users-form.component';
declare let alertify: any;

@Component({
  selector: 'app-users-tables',
  templateUrl: './users-tables.component.html',
  styleUrls: ['./users-tables.component.css']
})
export class UsersTablesComponent implements AfterViewInit {
  displayedColumns: string[] = ['Accion', 'Cedula', 'Nombre', 'Email', 'Contacto', 'Fecha de Nacimiento', 'Direccion', 'Estado'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  usuarios: any[] = [];

  constructor(private spinner: NgxSpinnerService,
    private userService: UsuariosService,
    public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.usuarios);
    this.getAllUsers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  getAllUsers() {
    this.spinner.show();
    this.userService.geAlltUsuario().subscribe(
      result => {
        this.usuarios = result;
        this.usuarios.sort((a, b) => b.user.estado_users - a.user.estado_users);
        this.dataSource = new MatTableDataSource(this.usuarios);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.spinner.hide();
      }
    );
  }

  createEditCategoria(userEdit: any) {

    const user: any = {};

    user.email=userEdit.user.email;
    user.password='';
    user.repeat_password='';
    user.CI_Usuario=userEdit.CI_Usuario;
    user.Nombre_Usuario=userEdit.Nombre_Usuario;
    user.FechaNacimiento_Usuario=userEdit.FechaNacimiento_Usuario;
    user.Cel_Usuario=userEdit.Cel_Usuario;
    user.Direccion_Usuario=userEdit.Direccion_Usuario;
    user.estado_users=userEdit.user.estado_users;
    user.rol_id=userEdit.rol_id;
    user.opcion=true;
    user.user_id=userEdit.user.id;



    const dialogref = this.dialog.open(UsersFormComponent, {
      height: 'auto',
      width: '50%',
      minWidth: '300px',
      minHeight: '250px',
      data: {
        section: false,
        user: user
      }
    });

    dialogref.afterClosed().subscribe(
      result => {
        if (result) {
          this.getAllUsers();
        }
      }
    );

  }


}


