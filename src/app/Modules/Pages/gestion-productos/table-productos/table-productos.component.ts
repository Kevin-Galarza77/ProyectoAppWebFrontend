import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductosService } from 'src/app/Services/productos.service';
import Swal from 'sweetalert2';
import { FormProductosComponent } from '../form-productos/form-productos.component';
declare let alertify: any;

@Component({
  selector: 'app-table-productos',
  templateUrl: './table-productos.component.html',
  styleUrls: ['./table-productos.component.css']
})
export class TableProductosComponent implements AfterViewInit {
  displayedColumns: string[] = ['Accion', 'Codigo', 'Nombre', 'Stock', 'Precio', 'Descripcion', 'Imagen'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  productos: any[] = [];

  constructor(private productosService: ProductosService,private spinner:NgxSpinnerService,
    public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.productos);
    this.getAllProductos();
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

  getAllProductos() {
    this.spinner.show();
    this.productosService.getAllProducts().subscribe(
      result => {
        if (result.status) {
          this.productos = result.data;
          this.dataSource = new MatTableDataSource(this.productos);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
        this.spinner.hide();
      }
    );
  }

  createEditProducto(producto: any) {

    let productoSend: any = {};

    productoSend.id = producto.id;
    productoSend.public_id = producto.public_id;
    productoSend.Nombre_Producto = producto.Nombre_Producto;
    productoSend.codigo_Producto = producto.codigo_Producto;
    productoSend.Stock_Producto = producto.Stock_Producto;
    productoSend.Precio_Producto = producto.Precio_Producto;
    productoSend.Descripcion_Producto = producto.Descripcion_Producto;
    productoSend.imagen = null;
    productoSend.url = producto.url;
    productoSend.subCategoria_id = producto.subCategoria_id;
    productoSend.categoria_id = producto.subcategoria.categoria_id;

    const dialogref = this.dialog.open(FormProductosComponent, {
      height: 'auto',
      width: '50%',
      minWidth: '300px',
      minHeight: '250px',
      data: {
        section: false,
        subCategory: productoSend
      }
    });

    dialogref.afterClosed().subscribe(
      result => {
        if (result) {
          this.getAllProductos();
        }
      }
    );
  }

  deleteProducto(id: any) {
    Swal.fire({ title: '¿Estás seguro?', text: "¡No podrás revertir esto!", icon: 'warning', showCancelButton: true, confirmButtonColor: 'rgb(220,53,69)', cancelButtonColor: 'gray', confirmButtonText: 'Eliminar', cancelButtonText: 'Cancelar', reverseButtons: true })
      .then((result) => {
        if (result.isConfirmed) {
          this.spinner.show();
          this.productosService.deleteProducto(id).subscribe(
            result => {
              if (result.status) {
                Swal.fire({ position: 'center', icon: 'success', title: result.alert, showConfirmButton: false, timer: 1500 });
                this.getAllProductos();
              } else {
                Swal.fire({ icon: 'error', title: result.alert, confirmButtonColor: 'red', confirmButtonText: 'Cerrar' });
                if (result.messages.length !== 0) {
                  for (let i = 0; i < result.messages.length; i++) {
                    alertify.error(result.messages[i]);
                  }
                }
              }
              this.spinner.hide();
            }
          );
        }
      });
  }

}


