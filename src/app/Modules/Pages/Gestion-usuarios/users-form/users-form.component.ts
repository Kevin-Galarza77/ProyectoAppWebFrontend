import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { RegisterService } from 'src/app/Modules/Auth/Services/register.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuariosService } from 'src/app/Services/usuarios.service';
declare let alertify: any;
@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css']
})
export class UsersFormComponent {

  section: boolean = true;

  userForm: FormGroup = this.fb.group({
    email: ['', Validators.required],//
    password: ['', Validators.required],
    repeat_password: ['', Validators.required],
    CI_Usuario: ['', Validators.required],//
    Nombre_Usuario: ['', Validators.required],//
    FechaNacimiento_Usuario: ['', Validators.required],//
    Cel_Usuario: ['', Validators.required],//
    Direccion_Usuario: ['', Validators.required],
    estado_users: ['', Validators.required],
    rol_id: ['', Validators.required],
    user_id:[''],
    opcion:[false]
  });

  hide: boolean = true;

  constructor(private fb: FormBuilder,
    private registerUSer: RegisterService,
    private usuarioService:UsuariosService,
    private spinner: NgxSpinnerService,
    @Optional() public dialogref: MatDialogRef<UsersFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
      if (data) {
        this.section=data.section;
        this.userForm.setValue(data.user);
        console.log(this.userForm.value);
      }
  }


  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  createUser() {

    if (this.section) {
      this.spinner.show();
      this.registerUSer.registerUser(this.userForm.value).subscribe(
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
        }
      );
    }else{
      this.spinner.show();
      this.usuarioService.updateUsuarioByAdmin(this.userForm.value).subscribe(
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
        }
      );
    }


  }

  letterOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode < 32 || charCode > 32) && (charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)) {
      return false;
    }
    return true;
  }

  close() {
    this.dialogref.close();
  }

}
