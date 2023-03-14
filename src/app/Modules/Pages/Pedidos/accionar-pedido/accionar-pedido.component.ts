import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PedidosService } from 'src/app/Services/pedidos.service';
declare let alertify: any;
import Swal from 'sweetalert2';

@Component({
  selector: 'app-accionar-pedido',
  templateUrl: './accionar-pedido.component.html',
  styleUrls: ['./accionar-pedido.component.css']
})
export class AccionarPedidoComponent {

  pedido:any={};
  section:boolean = true;

  constructor(private pedidoService:PedidosService,
    @Optional() public dialogref: MatDialogRef<AccionarPedidoComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any){
      if (data) {
        this.pedido = data.pedido;
        this.section=data.section;
      }
    }

    updateEstadoPedido(estado:any){
      this.pedidoService.updateEstadoPedidos(this.pedido.id,estado).subscribe(
        result=>{
          if (result.status) {
            Swal.fire({ position: 'center', icon: 'success', title: result.alert, confirmButtonColor:'green' });
            this.dialogref.close('rerender');
          }else{
            Swal.fire({ icon: 'error', title: result.alert, confirmButtonColor: 'red', confirmButtonText: 'Cerrar' });
            if (result.messages.length !== 0) {
              for (let i = 0; i < result.messages.length; i++) {
                alertify.error(result.messages[i]);
              }
            }
          }
        }
      )
    }
    
    close(){
      this.dialogref.close();
    }
}
