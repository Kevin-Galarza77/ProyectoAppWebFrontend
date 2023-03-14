import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductosService } from 'src/app/Services/productos.service';
import { UsuariosService } from 'src/app/Services/usuarios.service';
import Swal from 'sweetalert2';
import { FormProductosComponent } from '../../gestion-productos/form-productos/form-productos.component'; 
declare let alertify: any;

@Component({
  selector: 'app-users-tables',
  templateUrl: './users-tables.component.html',
  styleUrls: ['./users-tables.component.css']
})
export class UsersTablesComponent implements AfterViewInit {
  displayedColumns: string[] = ['Accion', 'Cedula', 'Nombre', 'Contacto', 'Fecha de Nacimiento', 'Direccion','Estado'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  usuarios: any[] = [];

  constructor(private productosService: ProductosService,
    private userService:UsuariosService,
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

 
  getAllUsers(){
    this.userService.geAlltUsuario().subscribe(
      result=>{
        this.usuarios = result;
        this.usuarios.sort((a, b) => b.user.estado_users - a.user.estado_users );
        this.dataSource = new MatTableDataSource(this.usuarios);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  updateEstadoUser(id:any,estado:any){
    const userinfo = {
      estado_users:estado,
      user_id:id
    }

    this.userService.updateEstadoUsuario(userinfo).subscribe(
      result=>{
        if (result.status) {
          Swal.fire({ position: 'center', icon: 'success', title: result.alert, confirmButtonColor:'green' });
          this.getAllUsers();
        }else{
          Swal.fire({ icon: 'error', title: result.alert, confirmButtonColor: 'red', confirmButtonText: 'Cerrar' });
          if (result.messages.length !== 0) {
            for (let i = 0; i < result.messages.length; i++) {
              alertify.error(result.messages[i]);
            }
          }
        }
      }
    );



  }

 
 

}


