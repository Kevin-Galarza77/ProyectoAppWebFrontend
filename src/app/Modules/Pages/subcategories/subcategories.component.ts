import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin, Observable } from 'rxjs';
import { ProductosService } from 'src/app/Services/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.css']
})
export class SubcategoriesComponent {

  subcategories: any[] = [];
  id: any = this.route.snapshot.params['id'];
  nombreCategory:string='';

  constructor(private productoService: ProductosService,private spinner:NgxSpinnerService,
    private route: ActivatedRoute) {
      this.spinner.show();
      forkJoin([
        this.getSubcategories(),
        this.getCategory()
      ]).subscribe(
        () => this.spinner.hide(),
        (error) => {
          console.log(error);
          this.spinner.hide();
          Swal.fire({ position: 'center', icon: 'error', title: "Se ha producido un error", confirmButtonColor: 'rgb(220,53,69)' });
        }
      );
  }



  getSubcategories():Observable<any>{
    return Observable.create((observer:any)=>{
      this.productoService.getSubCategorias(this.id).subscribe(
        result => {
          this.subcategories = result.data;
          observer.next();
          observer.complete();
        },
        (error) => {
          observer.error(error);
        }
      );
    })
  }
  
  getCategory(){
    return Observable.create((observer:any)=>{
      this.productoService.getCategory(this.id).subscribe(
        result=>{
          this.nombreCategory=result.nombre;
          observer.next();
          observer.complete();
        },
        (error) => {
          observer.error(error);
        }
      );
    })
  }






}
