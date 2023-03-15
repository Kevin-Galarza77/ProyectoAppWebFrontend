import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { PedidosService } from 'src/app/Services/pedidos.service';
import { AccionarPedidoComponent } from '../accionar-pedido/accionar-pedido.component';
declare let alertify: any;

@Component({
  selector: 'app-table-pedidos-admin',
  templateUrl: './table-pedidos-admin.component.html',
  styleUrls: ['./table-pedidos-admin.component.css']
})
export class TablePedidosAdminComponent implements AfterViewInit {
  displayedColumns: string[] = ['Accion', 'Usuario', 'Fecha', 'Direccion', 'Total', 'Estado'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  pedidos: any[] = [];

  section: boolean = true;

  constructor(private pedidosService: PedidosService,private spinner:NgxSpinnerService,
    public dialog: MatDialog) {
    const rol = Number(localStorage.getItem('rol'));
    if (rol === 2) {
      this.section = false;
      this.getPedidosForUser();
    }else{
      this.getAllPedidos();
    }
    this.dataSource = new MatTableDataSource(this.pedidos);
    
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
    this.spinner.show();
    this.pedidosService.getAllPedidos().subscribe(
      result => {
        this.pedidos = result;
        this.pedidos.sort((a, b) => a.estados__pedido_id - b.estados__pedido_id);
        this.dataSource = new MatTableDataSource(this.pedidos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.spinner.hide();
      }
    );
  }

  getPedidosForUser() {
    this.spinner.show();
    this.pedidosService.getPedidosForUser().subscribe(
      result => {
        if (result.status) {
          this.pedidos = result.data;
          this.pedidos.sort((a, b) => a.estados__pedido_id - b.estados__pedido_id);
          this.dataSource = new MatTableDataSource(this.pedidos);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
        this.spinner.hide();
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
        pedido: pedido
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
