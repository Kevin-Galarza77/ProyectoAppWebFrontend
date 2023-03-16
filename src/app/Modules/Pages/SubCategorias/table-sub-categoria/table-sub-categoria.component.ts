import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { SubCategoriasService } from 'src/app/Services/sub-categorias.service';
import Swal from 'sweetalert2';
import { FormSubCategoriaComponent } from '../form-sub-categoria/form-sub-categoria.component';
declare let alertify: any;
@Component({
  selector: 'app-table-sub-categoria',
  templateUrl: './table-sub-categoria.component.html',
  styleUrls: ['./table-sub-categoria.component.css']
})
export class TableSubCategoriaComponent {
  displayedColumns: string[] = ['Acción', 'Nombre', 'Imagen'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  subCategorys: any[] = [];

  constructor(private subCategoryService: SubCategoriasService,private spinner:NgxSpinnerService,
    public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.subCategorys);
    this.getAllSubCategorys();
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

  getAllSubCategorys() {
    this.spinner.show();
    this.subCategoryService.getAllSubcategories().subscribe(
      result => {
        if (result.status) {
          this.subCategorys = result.data;
          this.dataSource = new MatTableDataSource(this.subCategorys);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
        this.spinner.hide();
      },
      (error) => {
        console.log(error);
        this.spinner.hide();
        Swal.fire({ position: 'center', icon: 'error', title: "Se ha producido un error", confirmButtonColor: 'rgb(220,53,69)' });
      }
    );
  }

  createEditCategoria(subCategory: any) {

    let subCategorySend: any = {};
    subCategorySend.nombre = subCategory.nombre;
    subCategorySend.id = subCategory.id;
    subCategorySend.imagen = null;
    subCategorySend.url = subCategory.url;
    subCategorySend.public_id = subCategory.public_id;
    subCategorySend.categoria_id = subCategory.categoria_id;

    const dialogref = this.dialog.open(FormSubCategoriaComponent, {
      height: 'auto',
      width: '50%',
      minWidth: '300px',
      minHeight: '250px',
      data: {
        section: false,
        subCategory: subCategorySend
      }
    });

    dialogref.afterClosed().subscribe(
      result => {
        if (result) {
          this.getAllSubCategorys();
        }
      }
    );
  }

  deleteCategory(id: any) {
    Swal.fire({ title: '¿Estás seguro?', text: "¡No podrás revertir esto!", icon: 'warning', showCancelButton: true, confirmButtonColor: 'rgb(220,53,69)', cancelButtonColor: 'gray', confirmButtonText: 'Eliminar', cancelButtonText: 'Cancelar', reverseButtons: true })
      .then((result) => {
        if (result.isConfirmed) {
          this.spinner.show();
          this.subCategoryService.deleteSubcategories(id).subscribe(
            result => {
              if (result.status) {
                Swal.fire({ position: 'center', icon: 'success', title: result.alert, showConfirmButton: false, timer: 1500 });
                this.getAllSubCategorys();
              } else {
                Swal.fire({ icon: 'error', title: result.alert, confirmButtonColor: 'red', confirmButtonText: 'Cerrar' });
                if (result.messages.length !== 0) {
                  for (let i = 0; i < result.messages.length; i++) {
                    alertify.error(result.messages[i]);
                  }
                }
              }
              this.spinner.hide();
            },
            (error) => {
              console.log(error);
              this.spinner.hide();
              Swal.fire({ position: 'center', icon: 'error', title: "Se ha producido un error", confirmButtonColor: 'rgb(220,53,69)' });
            }
          );
        }
      });
  }

}

