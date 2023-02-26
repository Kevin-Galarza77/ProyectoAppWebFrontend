import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from 'src/app/Services/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {

  productos:any[]=[];
  subcategoria_id:string='';
  subcategoria_nombre:string='';
  id: any = this.route.snapshot.params['sub'];

  constructor(private productoService:ProductosService,
    private route: ActivatedRoute){
      this.getProductos();
      this.getSubCategory();
  }


  getProductos(){
    this.productoService.getProducts(this.id).subscribe(
      result=>{
        if (result.status) {
          this.productos = result.data;
        }
      }
    )
  }

  getSubCategory(){
    this.productoService.getSubCategory(this.id).subscribe(
      result=>{
        if (result.status) {
          this.subcategoria_nombre= result.data.nombre;
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
