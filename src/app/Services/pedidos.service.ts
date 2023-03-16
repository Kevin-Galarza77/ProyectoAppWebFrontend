import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './global.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(private http: HttpClient) { }

  hearders() {
    const token = localStorage.getItem('token');
    return { Authorization: `Bearer ${token}` };
  }

  getAllPedidos(): Observable<any> {
    const headers = this.hearders();
    return this.http.get(`${GLOBAL.url}pedidos`, { headers });
  }

  getPedidosForUser(): Observable<any> {
    const headers = this.hearders();
    const user_id = localStorage.getItem('user_id');
    return this.http.get(`${GLOBAL.url}pedidos/ForUserId?user_id=${user_id}`,{ headers });
  }

  updateEstadoPedidos(id:any,estado:any): Observable<any> {
    const headers = this.hearders();
    return this.http.put(`${GLOBAL.url}pedidos/updateEstado?cabezara_id=${id}&estado=${estado}`,{},{ headers });
  }

  createPedido(pedido:any): Observable<any> {
    const headers = this.hearders();
    return this.http.post(`${GLOBAL.url}pedidos`,pedido,{ headers });
  }


}
