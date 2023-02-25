import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from './global.service';



@Injectable({
  providedIn: 'root'
})
export class InicioService {

  token:string = String(localStorage.getItem('token'));

  constructor(private http: HttpClient) { }

  hearders() {
    const token = localStorage.getItem('token');
    return { Authorization: `Bearer ${token}` };
  }

  getFavoritesProducts(): Observable<any> {
    
    const headers = this.hearders();

    return this.http.get(`${GLOBAL.url}products/favorites?token=${this.token}`, { headers });

  }


}
