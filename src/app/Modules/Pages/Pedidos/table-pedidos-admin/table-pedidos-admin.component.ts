import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PedidosService } from 'src/app/Services/pedidos.service';
import { ProductosService } from 'src/app/Services/productos.service';
import Swal from 'sweetalert2';
import { FormProductosComponent } from '../../gestion-productos/form-productos/form-productos.component'; 
import { AccionarPedidoComponent } from '../accionar-pedido/accionar-pedido.component';
declare let alertify: any;

@Component({
  selector: 'app-table-pedidos-admin',
  templateUrl: './table-pedidos-admin.component.html',
  styleUrls: ['./table-pedidos-admin.component.css']
})
export class TablePedidosAdminComponent  implements AfterViewInit {
  displayedColumns: string[] = ['Accion', 'Usuario', 'Fecha', 'Direccion', 'Total', 'Estado'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  pedidos: any[] = [];

  section:boolean = true;

  constructor(private pedidosService: PedidosService,
    public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.pedidos);
    this.getAllPedidos();
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

  getAllPedidos() {
    this.pedidosService.getAllPedidos().subscribe(
      result => {
        this.pedidos= result;
        this.pedidos.sort((a, b) => a.estados__pedido_id - b.estados__pedido_id);
        this.dataSource = new MatTableDataSource(this.pedidos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  AccionarPedido(pedido: any) {
    const dialogref = this.dialog.open(AccionarPedidoComponent, {
      height: '80%',
      width: '50%',
      minWidth: '300px',
      minHeight: '250px',
      data: {
        section: this.section,
        pedido:pedido 
      }
    });

    dialogref.afterClosed().subscribe(
      result => {
        if (result) {
          this.getAllPedidos();
        }
      }
    );
  }

}
