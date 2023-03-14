import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CategoriasService } from 'src/app/Services/categorias.service';
import Swal from 'sweetalert2';
import { FormCategoriaComponent } from '../form-categoria/form-categoria.component';
declare let alertify: any;

@Component({
  selector: 'app-table-categoria',
  templateUrl: './table-categoria.component.html',
  styleUrls: ['./table-categoria.component.css']
})
export class TableCategoriaComponent implements AfterViewInit {
  displayedColumns: string[] = ['Acción', 'Nombre', 'Imagen'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  categorys: any[] = [];

  constructor(private categoryService: CategoriasService,
    public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.categorys);
    this.getAllCategorys();
  }

  ngAfterViewInit() {
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

  getAllCategorys() {
    this.categoryService.getAllCategorys().subscribe(
      result => {
        if (result.status) {
          this.categorys = result.data;
          this.dataSource = new MatTableDataSource(this.categorys);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      }
    );
  }

  createEditCategoria(category: any) {

    let categorySend: any = {};
    categorySend.nombre = category.nombre;
    categorySend.id = category.id;
    categorySend.imagen = null;
    categorySend.url = category.url;
    categorySend.public_id = category.public_id;

    const dialogref = this.dialog.open(FormCategoriaComponent, {
      height: 'auto',
      width: '50%',
      minWidth: '300px',
      minHeight: '250px',
      data: {
        section: false,
        category: categorySend
      }
    });

    dialogref.afterClosed().subscribe(
      result => {
        if (result) {
          this.getAllCategorys();
        }
      }
    );
  }

  deleteCategory(id: any) {
    Swal.fire({ title: '¿Estás seguro?', text: "¡No podrás revertir esto!", icon: 'warning', showCancelButton: true, confirmButtonColor: 'rgb(220,53,69)', cancelButtonColor: 'gray', confirmButtonText: 'Eliminar', cancelButtonText: 'Cancelar', reverseButtons: true })
      .then((result) => {
        if (result.isConfirmed) {
          this.categoryService.deleteCategorys(id).subscribe(
            result => {
              if (result.status) {
                Swal.fire({ position: 'center', icon: 'success', title: result.alert, showConfirmButton: false, timer: 1500 });
                this.getAllCategorys();
              } else {
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
      });
  }

}

