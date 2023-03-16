import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { RegisterService } from '../Services/register.service';
declare let alertify: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  userForm: FormGroup = this.fb.group({
    email: ['', Validators.required],//
    password: ['', Validators.required],
    repeat_password: ['', Validators.required],
    CI_Usuario: ['', Validators.required],//
    Nombre_Usuario: ['', Validators.required],//
    FechaNacimiento_Usuario: ['', Validators.required],//
    Cel_Usuario: ['', Validators.required],//
    Direccion_Usuario: ['', Validators.required],
    opcion:[true]
  });

  hide: boolean = true;

  constructor(private fb: FormBuilder,
    private registerUSer: RegisterService,
    private router:Router,
    private spinner:NgxSpinnerService) {

  }


  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  createUser() {
    this.spinner.show();
    this.registerUSer.registerUser(this.userForm.value).subscribe(
      result => {
        if (result.status) {
          Swal.fire({ position: 'center', icon: 'success', title: result.alert , text:'Espera que el administrador acepte la activación de la cuenta.', confirmButtonColor:'green' });
          this.router.navigateByUrl('/Login');
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

  letterOnly(event:any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode < 32 || charCode > 32) && (charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)) {
      return false;
    }
    return true;
  }


}
