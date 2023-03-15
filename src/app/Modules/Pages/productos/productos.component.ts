import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin, Observable } from 'rxjs';
import { ProductosService } from 'src/app/Services/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {

  productos: any[] = [];
  subcategoria_id: string = '';
  subcategoria_nombre: string = '';
  id: any = this.route.snapshot.params['sub'];

  constructor(private productoService: ProductosService,private spinner:NgxSpinnerService,
    private route: ActivatedRoute) {
      this.spinner.show();
      forkJoin([
        this.getProductos(),
        this.getSubCategory()
      ]).subscribe(
        () => this.spinner.hide(),
        (error) => {
          console.log(error);
          this.spinner.hide();
        }
      );

  }


  getProductos(): Observable<any> {
    return Observable.create((observer: any) => {
      this.productoService.getProducts(this.id).subscribe(
        result => {
          if (result.status) {
            this.productos = result.data;
          }
          observer.next();
          observer.complete();
        },
        (error) => {
          observer.error(error);
        }
      )
    })
  }

  getSubCategory(): Observable<any> {
    return Observable.create((observer: any) => {
      this.productoService.getSubCategory(this.id).subscribe(
        result => {
          if (result.status) {
            this.subcategoria_nombre = result.data.nombre;
          }
          observer.next();
          observer.complete();
        },
        (error) => {
          observer.error(error);
        }
      );
    })
  }

  incrementProduct(id: any, stock: number) {
    const input = document.getElementById(id) as HTMLInputElement;
    if (Number(input.value) < stock) input.value = (Number(input.value) + 1).toString();
  }

  decreaseProduct(id: any) {
    const input = document.getElementById(id) as HTMLInputElement;
    if (Number(input.value) > 0) input.value = (Number(input.value) - 1).toString();
  }

  maxvalue(id: any, maxStock: any) {
    const input = document.getElementById(id) as HTMLInputElement;
    console.log(id);
    if (maxStock < Number(input.value)) input.value = maxStock;
    input.focus();
  }

}
