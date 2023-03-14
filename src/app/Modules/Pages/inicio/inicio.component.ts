import { Component } from '@angular/core';
import { ProductosService } from 'src/app/Services/productos.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {

  favoritesProducts:any[]=[];
  categories:any[]=[];

  constructor(private productService:ProductosService){
    this.getFAvoritesProducts();
    this.getCategories();
  }


  getFAvoritesProducts(){

    this.productService.getFavoritesProducts().subscribe(
      result=>{
        if (result.status) {
          this.favoritesProducts = result.data;
        }

      }
    );

  }

  getCategories(){
    this.productService.getCategorias().subscribe(
      result=>{
        this.categories=result.data;
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
