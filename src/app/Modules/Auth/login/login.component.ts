import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  loginForm: FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router:Router) {

  }

  signIn() {

    this.authService.login(this.loginForm.value).subscribe(
      result => {
        console.log(result.data);
        if (result.status) {
          localStorage.setItem('token',result.token);
          localStorage.setItem('user_id',result.data.id);
          localStorage.setItem('usuario_id',result.data.usuario.id);
          Swal.fire({ position: 'center', icon: 'success', title: "Bienvenido", showConfirmButton: false, timer: 1500 });
          this.router.navigateByUrl('/Home');
        } else {
          if (result.auth) {
            this.router.navigateByUrl('/Home');
          }
          Swal.fire({icon: 'error',title: result.alert,confirmButtonColor: 'red',confirmButtonText: 'Cerrar'});
          if (result.messages.length !== 0) {
            for (let i = 0; i < result.messages.length; i++) {
              alertify.error(result.messages[i]);
            }
          }
        }
      }
    )


  }


}