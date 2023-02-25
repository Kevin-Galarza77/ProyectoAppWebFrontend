import { Component } from '@angular/core';
import { InicioService } from 'src/app/Services/inicio.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {

  favoritesProducts:any[]=[];

  constructor(private inicioService:InicioService){
    this.getFAvoritesProducts();
  }


  getFAvoritesProducts(){
    this.inicioService.getFavoritesProducts().subscribe(
      result=>{
        if (result.status) {
          this.favoritesProducts = result.data;
        }

      }
    );
  }

  incrementProduct(id:any,stock:number){
    const input = document.getElementById(id) as HTMLInputElement;
    if( Number(input.value) < stock) input.value = (Number(input.value) + 1).toString();
  }

  decreaseProduct(id:any){
    const input = document.getElementById(id) as HTMLInputElement;
    if( Number(input.value) > 0) input.value = (Number(input.value) - 1).toString();
  }

  maxvalue(id:any,maxStock:any){
    const input = document.getElementById(id) as HTMLInputElement;
    console.log(id);
    if (maxStock < Number(input.value)) input.value = maxStock;
    input.focus();
  }

}
