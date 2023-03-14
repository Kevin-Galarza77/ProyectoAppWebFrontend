import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './global.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  token: string = String(localStorage.getItem('token'));

  constructor(private http: HttpClient) { }

  hearders() {
    const token = localStorage.getItem('token');
    return { Authorization: `Bearer ${token}` };
  }

  getAllCategorys(): Observable<any> {
    const headers = this.hearders();
    return this.http.get(`${GLOBAL.url}categories`, { headers });
  }

  createCategorys(category:any): Observable<any> {
    const headers = this.hearders();
    return this.http.post(`${GLOBAL.url}categories`, category ,{ headers });
  }

  updateCategorys(category:any,id:any): Observable<any> {
    const headers = this.hearders();
    return this.http.post(`${GLOBAL.url}categories/${id}`, category ,{ headers });
  }

  deleteCategorys(id:any): Observable<any> {
    const headers = this.hearders();
    return this.http.delete(`${GLOBAL.url}categories/${id}` ,{ headers });
  }

}
