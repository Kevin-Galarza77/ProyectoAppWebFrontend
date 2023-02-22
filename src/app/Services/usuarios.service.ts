import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  hearders() {
    const token = localStorage.getItem('token');
    return { Authorization: `Bearer ${token}` };
  }

  getUsuario(id: any): Observable<any> {
    const headers = this.hearders();
    return this.http.get(`${GLOBAL.url}usuarios/${id}`, { headers });
  }

  updateUsuario(usuario:any): Observable<any>{
    const headers = this.hearders();
    return this.http.put(`${GLOBAL.url}usuarios/${usuario.id}`, usuario , { headers } );
  }



}
