import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductosService } from 'src/app/Services/productos.service';
import { forkJoin, Observable, Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  favoritesProducts:any[]=[];
  categories:any[]=[];

  constructor(private productService:ProductosService,private spinner:NgxSpinnerService){

  }

  ngOnInit(): void {
    this.spinner.show();
    forkJoin([
      this.getFAvoritesProducts(),
      this.getCategories()
    ]).subscribe(
      () => this.spinner.hide(),
      (error) => {
        console.log(error);
        this.spinner.hide();
      }
    );
  }


  getFAvoritesProducts():Observable<any>{
    return Observable.create((observer:any)=>{
      this.productService.getFavoritesProducts().subscribe(
        result=>{
          if (result.status) {
            this.favoritesProducts = result.data;
          }
          observer.next();
          observer.complete();
        },
        (error) => {
          observer.error(error);
          Swal.fire({ allowOutsideClick: false, icon: 'error', text: 'Ocurrio un error al cargar los productos favoritos. ', confirmButtonColor: 'rgb(220,53,69)', });
        }
      );
    })
  }

  getCategories():Observable<any>{
    return Observable.create((observer:any)=>{
      this.productService.getCategorias().subscribe(
        result=>{
          this.categories=result.data;
          observer.next();
          observer.complete();
        },
        (error) => {
          observer.error(error);
          Swal.fire({ allowOutsideClick: false, icon: 'error', text: 'Ocurrio un error al cargar los productos favoritos. ', confirmButtonColor: 'rgb(220,53,69)', });
        }
      );
    })
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
