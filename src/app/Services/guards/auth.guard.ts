import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router'; 
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private route:Router
    ){}

  canActivate():boolean{
    
    const username = localStorage.getItem('token');
    const rol = [1,2].includes(Number(localStorage.getItem('rol')));
    let user_id:boolean;
    
    if (username && rol) {

      return true;
      
    }else{

      Swal.fire({ position: 'center', icon: 'error', title: "Acceso negado. Por favor inicie sesión", confirmButtonColor: 'rgb(220,53,69)' });
      
      this.route.navigateByUrl('/login');

      return false;
    }

  }
  
}
