import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadouser'
})
export class EstadouserPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (value==1) {
      return 'Activo';
    }else{
      return 'Inactivo';
    }
  }

}
