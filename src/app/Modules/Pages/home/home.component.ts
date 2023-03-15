import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { AuthService } from '../../Auth/Services/auth.service';
import { ChangePasswordComponent } from '../change-password/change-password.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  admin:boolean = false;

  constructor(private authService: AuthService,
    private router: Router,
    private spinner:NgxSpinnerService,
    public dialog: MatDialog) {
      const rol = Number(localStorage.getItem('rol'));
      if (rol === 1) this.admin=true;
  }

  logout() {
    this.spinner.show();
    this.authService.logout().subscribe(result => {
      if (result.status) {
        Swal.fire({ position: 'center', icon: 'success', title: result.alert, showConfirmButton: false, timer: 2500 });
        this.router.navigateByUrl('/Login');
      } else {
        Swal.fire({ allowOutsideClick: false, icon: 'error', text: result.alert, confirmButtonColor: 'rgb(220,53,69)' });
      }
      this.spinner.hide();
    });

    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    
  }

  changePassword() {
    const changePassword = this.dialog.open(ChangePasswordComponent, {
      height: 'auto',
      width: '30%',
      minWidth: '300px',
      minHeight: '250px'
    });


  }

}
