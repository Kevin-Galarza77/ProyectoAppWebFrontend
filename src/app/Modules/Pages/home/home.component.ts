import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CarService } from 'src/app/Services/car.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../Auth/Services/auth.service';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { SoporteTecnicoTableComponent } from './soporte-tecnico-table/soporte-tecnico-table.component';
import { SoporteTecnicoComponent } from './soporte-tecnico/soporte-tecnico.component';

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
    public car:CarService,
    public dialog: MatDialog) {
      const rol = Number(localStorage.getItem('rol'));
      if (rol === 1) this.admin=true;
  }

  logout() {
    this.spinner.show();
    this.authService.logout().subscribe(result => {
      if (result.status) {
        localStorage.removeItem('token');
        localStorage.removeItem('rol');
        localStorage.removeItem('user_id');
        localStorage.removeItem('car');
        Swal.fire({ position: 'center', icon: 'success', title: result.alert, showConfirmButton: false, timer: 2500 });
        this.router.navigateByUrl('/Login');
      } else {
        Swal.fire({ allowOutsideClick: false, icon: 'error', text: result.alert, confirmButtonColor: 'rgb(220,53,69)' });
      }
      this.spinner.hide();
    },
    error=>{
      this.spinner.hide();
      console.log(error);
      localStorage.removeItem('token');
      localStorage.removeItem('rol');
      localStorage.removeItem('user_id');
      localStorage.removeItem('car');
      this.router.navigateByUrl('/Login');
    });

  }

  changePassword() {
    const changePassword = this.dialog.open(ChangePasswordComponent, {
      height: 'auto',
      width: '30%',
      minWidth: '300px',
      minHeight: '250px'
    });
  }

  soporteTecnico(){
    const sendMessege = this.dialog.open(SoporteTecnicoComponent, {
      height: 'auto',
      width: '30%',
      minWidth: '300px',
      minHeight: '250px'
    });
  }

  soporteTecnicoList(){
    const sendMessege = this.dialog.open(SoporteTecnicoTableComponent, {
      height: 'auto',
      width: '50%',
      minWidth: '300px',
      minHeight: '250px'
    });
  }
  
}
