import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../Services/auth.service';
import { ActivatedRoute } from '@angular/router';
declare let alertify: any;


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  token: string = this.route.snapshot.params['token'];

  loginForm: FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    repeat_password: ['', Validators.required]
  });

  hide: boolean = true;

  constructor(private authService: AuthService, private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute) {

  }


  resetPassword() {
    this.authService.resetPassword(this.loginForm.value, this.token).subscribe(
      result => {
        if (result.status) {
          Swal.fire({ position: 'center', icon: 'success', title: result.alert, showConfirmButton: false, timer: 1500 });
          this.router.navigateByUrl('/Login');
        } else {
          Swal.fire({ icon: 'error', title: result.alert, confirmButtonColor: 'red', confirmButtonText: 'Cerrar' });
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
