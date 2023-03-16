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

  getUsuario(): Observable<any> {
    const headers = this.hearders();
    const user_id = localStorage.getItem('user_id');
    return this.http.get(`${GLOBAL.url}usuarios/${user_id}`, { headers });
  }

  geAlltUsuario(): Observable<any> {
    const headers = this.hearders();
    return this.http.get(`${GLOBAL.url}usuarios`, { headers });
  }

  updateUsuario(usuario:any): Observable<any>{
    const headers = this.hearders();
    const user_id = localStorage.getItem('user_id');
    return this.http.put(`${GLOBAL.url}usuarios/${user_id}`, usuario , { headers } );
  }

  updateEstadoUsuario(usuario:any): Observable<any>{
    const headers = this.hearders();
    return this.http.put(`${GLOBAL.url}user/${usuario.user_id}`, usuario , { headers } );
  }

  updateUsuarioByAdmin(usuario:any): Observable<any>{
    const headers = this.hearders();
    return this.http.put(`${GLOBAL.url}usuarios/${usuario.user_id}`, usuario , { headers } );
  }

}
