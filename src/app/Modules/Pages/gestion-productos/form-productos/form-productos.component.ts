import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoriasService } from 'src/app/Services/categorias.service';
import { ProductosService } from 'src/app/Services/productos.service';
import { SubCategoriasService } from 'src/app/Services/sub-categorias.service';
import Swal from 'sweetalert2';
declare let alertify: any;

@Component({
  selector: 'app-form-productos',
  templateUrl: './form-productos.component.html',
  styleUrls: ['./form-productos.component.css']
})
export class FormProductosComponent {

  section: boolean = true;

  categorys: any[] = [];
  subCategorys: any[] = [];

  formProducto: FormGroup = this.fb.group({
    Nombre_Producto: ['', Validators.required],
    codigo_Producto: ['', Validators.required],
    Stock_Producto: ['', Validators.required],
    Precio_Producto: ['', Validators.required],
    Descripcion_Producto: ['', Validators.required],
    imagen: [null, [Validators.required, Validators.pattern(/^.*\.(png|jpg|jpeg)$/)]],
    url: [''],
    id: [''],
    public_id: [''],
    subCategoria_id: [null, Validators.required],
    categoria_id: [null, Validators.required]
  });

  fileToUpload!: File;



  constructor(private fb: FormBuilder,
    private categoryService: CategoriasService,
    private subCategoryService: SubCategoriasService,
    private prodcutoService: ProductosService,
    private spinner: NgxSpinnerService,
    @Optional() public dialogref: MatDialogRef<FormProductosComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    this.getAllCategorys();
    if (data) {
      this.section = data.section;
      this.formProducto.setValue(data.subCategory);
      this.getAllSubCategorys(this.formProducto.value.categoria_id);
    }
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.type.includes('image')) {
        this.fileToUpload = file;
      } else {
        this.formProducto.get('imagen')?.setValue(null);
        Swal.fire({ icon: 'error', title: 'El archivo debe ser una imagen', confirmButtonColor: 'red', confirmButtonText: 'Cerrar' });
      }
    }
  }

  getAllCategorys() {
    this.spinner.show();
    this.categoryService.getAllCategorys().subscribe(
      result => {
        if (result.status) {
          this.categorys = result.data;
        }
        this.spinner.hide();
      },
      (error) => {
        console.log(error);
        this.spinner.hide();
        Swal.fire({ position: 'center', icon: 'error', title: "Se ha producido un error", confirmButtonColor: 'rgb(220,53,69)' });
      }
    );
  }

  getAllSubCategorys(category_id: any) {
    this.spinner.show();
    this.subCategoryService.getAllSubcategoriesForID(category_id).subscribe(
      result => {
        if (result.status) {
          this.subCategorys = result.data;
        }
        this.spinner.hide();
      },
      (error) => {
        console.log(error);
        this.spinner.hide();
        Swal.fire({ position: 'center', icon: 'error', title: "Se ha producido un error", confirmButtonColor: 'rgb(220,53,69)' });
      }
    );
  }


  createEditProducto() {

    const formData = new FormData();

    formData.append('Nombre_Producto', this.formProducto.get('Nombre_Producto')?.value);
    formData.append('codigo_Producto', this.formProducto.get('codigo_Producto')?.value);
    formData.append('Stock_Producto', this.formProducto.get('Stock_Producto')?.value);
    formData.append('Precio_Producto', this.formProducto.get('Precio_Producto')?.value);
    formData.append('Descripcion_Producto', this.formProducto.get('Descripcion_Producto')?.value);
    formData.append('subCategoria_id', this.formProducto.get('subCategoria_id')?.value);

    if (this.section) {
      formData.append('imagen', this.fileToUpload);
      this.spinner.show();
      this.prodcutoService.createProducto(formData).subscribe(
        result => {
          if (result.status) {
            Swal.fire({ position: 'center', icon: 'success', title: result.alert, confirmButtonColor: 'green' });
            this.dialogref.close('rerender');
          } else {
            Swal.fire({ icon: 'error', title: result.alert, confirmButtonColor: 'red', confirmButtonText: 'Cerrar' });
            if (result.messages.length !== 0) {
              for (let i = 0; i < result.messages.length; i++) {
                alertify.error(result.messages[i]);
              }
            }
          }
          this.spinner.hide();
        },
        (error) => {
          console.log(error);
          this.spinner.hide();
          Swal.fire({ position: 'center', icon: 'error', title: "Se ha producido un error", confirmButtonColor: 'rgb(220,53,69)' });
        }
      );
    } else {
      if (this.fileToUpload) formData.append('imagen', this.fileToUpload);
      formData.append('public_id', this.formProducto.get('public_id')?.value);
      this.spinner.show();
      this.prodcutoService.updateProducto(formData, this.formProducto.value.id).subscribe(
        result => {
          if (result.status) {
            Swal.fire({ position: 'center', icon: 'success', title: result.alert, confirmButtonColor: 'green' });
            this.dialogref.close('rerender');
          } else {
            Swal.fire({ icon: 'error', title: result.alert, confirmButtonColor: 'red', confirmButtonText: 'Cerrar' });
            if (result.messages.length !== 0) {
              for (let i = 0; i < result.messages.length; i++) {
                alertify.error(result.messages[i]);
              }
            }
          }
          this.spinner.hide();
        },
        (error) => {
          console.log(error);
          this.spinner.hide();
          Swal.fire({ position: 'center', icon: 'error', title: "Se ha producido un error", confirmButtonColor: 'rgb(220,53,69)' });
        }
      );
    }
  }

  close() {
    this.dialogref.close();
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

}
