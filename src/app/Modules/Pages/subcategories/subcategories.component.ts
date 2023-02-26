import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from 'src/app/Services/productos.service';

@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.css']
})
export class SubcategoriesComponent {

  subcategories: any[] = [];
  id: any = this.route.snapshot.params['id'];
  nombreCategory:string='';

  constructor(private productoService: ProductosService,
    private route: ActivatedRoute) {
      this.getSubcategories();
      this.getCategory();
  }



  getSubcategories() {
    this.productoService.getSubCategorias(this.id).subscribe(
      result => {
        console.log(result);
        this.subcategories = result.data;
      }
    );
  }
  getCategory(){
    this.productoService.getCategory(this.id).subscribe(
      result=>{
        console.log(result);
        this.nombreCategory=result.nombre;
      }
    );
  }






}
