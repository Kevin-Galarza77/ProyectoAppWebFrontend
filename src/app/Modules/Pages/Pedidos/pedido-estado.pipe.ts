import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pedidoEstado'
})
export class PedidoEstadoPipe implements PipeTransform {

  transform(value: unknown) {

    switch (value) {
      case 1:
        return 'PENDIENTE';
      case 2:
        return 'EN PROCESO';
      case 3:
        return 'ENTREGADO';
      case 4:
        return 'RECHAZADO';
      default:
        return 'NONE';
    }

  }

}
