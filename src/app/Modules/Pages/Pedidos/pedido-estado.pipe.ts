import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pedidoEstado'
})
export class PedidoEstadoPipe implements PipeTransform {

  transform(value: unknown) {

    switch (value) {
      case 1:
        return 'Pendiente';
      case 2:
        return 'Entregando';
      case 3:
        return 'Entregado';
      case 4:
        return 'Rechazado';
      default:
        return 'None';
    }

  }

}
