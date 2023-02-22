import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../Auth/Services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {


  constructor(private authService:AuthService,
              private router: Router){

  }

  logout(){

    this.authService.logout().subscribe(result=>{
      if (result.status) {
        Swal.fire({ position: 'center', icon: 'success', title: result.alert, showConfirmButton: false, timer: 2500 });
        this.router.navigateByUrl('/Login');
      } else {
        Swal.fire({ allowOutsideClick: false, icon: 'error', text: result.alert, confirmButtonColor: 'rgb(220,53,69)' });
      }
    });

  }

}
