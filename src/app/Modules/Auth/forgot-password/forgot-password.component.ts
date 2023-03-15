import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { AuthService } from '../Services/auth.service';
declare let alertify: any;

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  email:string='';


  constructor(private authService: AuthService, private router: Router,private spinner:NgxSpinnerService){
    
  }


  resetPassword(){
    this.spinner.show();
    this.authService.forgotPassword(this.email).subscribe(
      result => {
        if (result.status) {
          Swal.fire({ position: 'center', icon: 'success', title: result.alert, showConfirmButton: false, timer: 1500 });
          this.router.navigateByUrl('/Login');
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
    );
  }

}
