import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidosComponent } from './pedidos.component';
import { TablePedidosAdminComponent } from './table-pedidos-admin/table-pedidos-admin.component';
import { TablePedidosClienteComponent } from './table-pedidos-cliente/table-pedidos-cliente.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { PedidoEstadoPipe } from './pedido-estado.pipe';
import { AccionarPedidoComponent } from './accionar-pedido/accionar-pedido.component';
import { MatDividerModule } from '@angular/material/divider';




@NgModule({
  declarations: [
    PedidosComponent,
    TablePedidosAdminComponent,
    TablePedidosClienteComponent,
    PedidoEstadoPipe,
    AccionarPedidoComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSortModule,
    MatDividerModule
  ]
})
export class PedidosModule { }
