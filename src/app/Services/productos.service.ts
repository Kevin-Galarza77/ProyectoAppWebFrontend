import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {


  token: string = String(localStorage.getItem('token'));

  constructor(private http: HttpClient) { }

  hearders() {
    const token = localStorage.getItem('token');
    return { Authorization: `Bearer ${token}` };
  }

  getFavoritesProducts(): Observable<any> {
    const headers = this.hearders();
    return this.http.get(`${GLOBAL.url}products/favorites?token=${this.token}`, { headers });
  }


  getCategorias(): Observable<any> {
    const headers = this.hearders();
    return this.http.get(`${GLOBAL.url}categories`, { headers });
  }

  getCategory(id: any): Observable<any> {
    const headers = this.hearders();
    return this.http.get(`${GLOBAL.url}categories/${id}`, { headers });
  }

  getSubCategory(id: any): Observable<any> {
    const headers = this.hearders();
    return this.http.get(`${GLOBAL.url}subcategories/Subcategory?subcategoria_id=${id}`, { headers });
  }


  getSubCategorias(id: any): Observable<any> {
    const headers = this.hearders();
    return this.http.get(`${GLOBAL.url}subcategories/ForCategory?categoria_id=${id}`, { headers });
  }

  getProducts(id: any): Observable<any> {
    const headers = this.hearders();
    return this.http.get(`${GLOBAL.url}products/ForSubCategory?subcategory_id=${id}`, { headers });
  }






}
