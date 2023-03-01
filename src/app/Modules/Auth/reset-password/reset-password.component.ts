import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../Services/auth.service';
declare let alertify: any;


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {


  loginForm: FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    rep_password: ['', Validators.required]
  });

  hide: boolean = true;

  constructor(private authService: AuthService, private router: Router,private fb: FormBuilder){
    
  }


  resetPassword(){

  }

}
