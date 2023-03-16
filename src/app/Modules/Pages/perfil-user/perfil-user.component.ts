import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsuariosService } from 'src/app/Services/usuarios.service';
import Swal from 'sweetalert2';
declare let alertify: any;

@Component({
  selector: 'app-perfil-user',
  templateUrl: './perfil-user.component.html',
  styleUrls: ['./perfil-user.component.css']
})
export class PerfilUSerComponent {


  userForm: FormGroup = this.fb.group({
    email: ['', Validators.required],
    CI_Usuario: ['', Validators.required],
    Nombre_Usuario: ['', Validators.required],
    FechaNacimiento_Usuario: ['', Validators.required],
    Cel_Usuario: ['', Validators.required],
    Direccion_Usuario: ['', Validators.required],
    opcion:[false]
  });

  usuario:any = {
    CI_Usuario:'',
    Cel_Usuario:'',
    Direccion_Usuario:'',
    FechaNacimiento_Usuario:'',
    Nombre_Usuario:'',
    email:''
  }

  EditUser:boolean=true;

  constructor(private fb:FormBuilder,private spinner:NgxSpinnerService,
              private usuarioService:UsuariosService)
  {
    this.getInfoUser();  
  }

  updateUSer(){
    this.spinner.show();
    this.usuarioService.updateUsuario(this.userForm.value).subscribe(
      result=>{
        if (result.status) {
          Swal.fire({ position: 'center', icon: 'success', title: result.alert , confirmButtonColor:'green' });
          this.EditUser=!this.EditUser;
          this.getInfoUser();
        }else{
          Swal.fire({ icon: 'error', title: result.alert, confirmButtonColor: 'red', confirmButtonText: 'Cerrar' });
          if (result.messages.length !== 0) {
            for (let i = 0; i < result.messages.length; i++) {
              alertify.error(result.messages[i]);
            }
          }
        }
        this.spinner.hide();
      }
    );
  }

  getInfoUser(){
    this.spinner.show();
    const usuario_id = localStorage.getItem('usuario_id');
    this.usuarioService.getUsuario(usuario_id).subscribe(
      result=>{

        if (result.status) {
          this.usuario.CI_Usuario = result.data.CI_Usuario;
          this.usuario.Cel_Usuario = result.data.Cel_Usuario;
          this.usuario.Direccion_Usuario = result.data.Direccion_Usuario;
          this.usuario.FechaNacimiento_Usuario = result.data.FechaNacimiento_Usuario;
          this.usuario.Nombre_Usuario = result.data.Nombre_Usuario;
          this.usuario.email = result.data.user.email;
          this.usuario.opcion = false;

          this.userForm.setValue(
            this.usuario
          );

        }else{
          Swal.fire({icon: 'error',title: result.alert,confirmButtonColor: 'red',confirmButtonText: 'Cerrar'});
        }
        this.spinner.hide();
      }
    );
  }

  
  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  letterOnly(event:any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode < 32 || charCode > 32) && (charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)) {
      return false;
    }
    return true;
  }

  


}
