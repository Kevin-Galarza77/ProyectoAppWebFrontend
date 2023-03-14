import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  token:string = String(localStorage.getItem('token'));

  constructor(private http: HttpClient) { }

  hearders() {
    const token = localStorage.getItem('token');
    return { Authorization: `Bearer ${token}` };
  }

  getUsuario(id: any): Observable<any> {
    const headers = this.hearders();
    return this.http.get(`${GLOBAL.url}usuarios/${this.token}`, { headers });
  }

  geAlltUsuario(): Observable<any> {
    const headers = this.hearders();
    return this.http.get(`${GLOBAL.url}usuarios`, { headers });
  }

  updateUsuario(usuario:any): Observable<any>{
    const headers = this.hearders();
    return this.http.put(`${GLOBAL.url}usuarios/${this.token}`, usuario , { headers } );
  }

  updateEstadoUsuario(usuario:any): Observable<any>{
    const headers = this.hearders();
    return this.http.put(`${GLOBAL.url}user/${usuario.user_id}`, usuario , { headers } );
  }

}
