import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { AuthService } from '../Services/auth.service';
declare let alertify: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  email = new FormControl('', [Validators.required, Validators.email]);
  hide: boolean = true;
  loginForm: FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router:Router,
    private spinner:NgxSpinnerService) {

  }

  signIn() {
    this.spinner.show();
    this.authService.login(this.loginForm.value).subscribe(
      result => {
        if (result.status) {
          Swal.fire({ position: 'center', icon: 'success', title: result.alert, showConfirmButton: false, timer: 1500 });
          localStorage.setItem('token',result.token);
          localStorage.setItem('rol',result.data.usuario.rol_id);
          localStorage.setItem('user_id',result.data.id);
          setTimeout(() => {
            this.router.navigateByUrl('/Home/Inicio');
          }, 1000);
        } else {
          Swal.fire({icon: 'error',title: result.alert,confirmButtonColor: 'red',confirmButtonText: 'Cerrar'});
          if (result.messages.length !== 0) {
            for (let i = 0; i < result.messages.length; i++) {
              alertify.error(result.messages[i]);
            }
          }
        }
        this.spinner.hide();
      }
    )


  }


}