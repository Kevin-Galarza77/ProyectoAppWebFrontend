import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriasService } from 'src/app/Services/categorias.service';
import { SubCategoriasService } from 'src/app/Services/sub-categorias.service';
import Swal from 'sweetalert2';
declare let alertify: any;
@Component({
  selector: 'app-form-sub-categoria',
  templateUrl: './form-sub-categoria.component.html',
  styleUrls: ['./form-sub-categoria.component.css']
})
export class FormSubCategoriaComponent  {

  section:boolean = true;

  categorys:any[]=[];

  formCategory: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    imagen: [null, [Validators.required, Validators.pattern(/^.*\.(png|jpg|jpeg)$/)]],
    url: [''],
    id:[''],
    public_id:[''],
    categoria_id: [null, Validators.required]
  });

  fileToUpload!: File;

  

  constructor(private fb:FormBuilder,
    private categoryService:CategoriasService,
    private subcategoryService:SubCategoriasService,
    @Optional() public dialogref: MatDialogRef<FormSubCategoriaComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any){
      this.getAllCategorys();
      if (data) {
        this.section = data.section;
        this.formCategory.setValue(data.subCategory);
      }
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.type.includes('image')) {
        this.fileToUpload = file;
      } else {
        this.formCategory.get('imagen')?.setValue(null);
        Swal.fire({ icon: 'error', title:'El archivo debe ser una imagen', confirmButtonColor: 'red', confirmButtonText: 'Cerrar' });
      }
    }
  }

  getAllCategorys() {
    this.categoryService.getAllCategorys().subscribe(
      result => {
        if (result.status) {
          this.categorys = result.data;
        }
      }
    );
  }


  createEditSubCategory(){

    const formData = new FormData();

    console.log(this.formCategory.get('nombre')?.value);
    formData.append('nombre', this.formCategory.get('nombre')?.value);
    formData.append('categoria_id', this.formCategory.get('categoria_id')?.value);

    if (this.section) {
      formData.append('imagen', this.fileToUpload);
      this.subcategoryService.createSubcategories(formData).subscribe(
        result=>{
          if (result.status) {
            Swal.fire({ position: 'center', icon: 'success', title: result.alert, confirmButtonColor:'green' });
            this.dialogref.close('rerender');
          }else{
            Swal.fire({ icon: 'error', title: result.alert, confirmButtonColor: 'red', confirmButtonText: 'Cerrar' });
            if (result.messages.length !== 0) {
              for (let i = 0; i < result.messages.length; i++) {
                alertify.error(result.messages[i]);
              }
            }
          }
        }
      );
    }else{
      if(this.fileToUpload) formData.append('imagen', this.fileToUpload);
      formData.append('public_id',this.formCategory.get('public_id')?.value);
      this.subcategoryService.updateSubcategories(formData,this.formCategory.value.id).subscribe(
        result=>{
          if (result.status) {
            Swal.fire({ position: 'center', icon: 'success', title: result.alert, confirmButtonColor:'green' });
            this.dialogref.close('rerender');
          }else{
            Swal.fire({ icon: 'error', title: result.alert, confirmButtonColor: 'red', confirmButtonText: 'Cerrar' });
            if (result.messages.length !== 0) {
              for (let i = 0; i < result.messages.length; i++) {
                alertify.error(result.messages[i]);
              }
            }
          }
        }
      );
    }
  }

  close(){
    this.dialogref.close();
  }

}