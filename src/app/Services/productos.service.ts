import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient) { }

  hearders() {
    const token = localStorage.getItem('token');
    return { Authorization: `Bearer ${token}` };
  }

  getFavoritesProducts(): Observable<any> {
    const headers = this.hearders();
    const user_id = localStorage.getItem('user_id');
    return this.http.get(`${GLOBAL.url}products/favorites?user_id=${user_id}`, { headers });
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

  getAllProducts(): Observable<any> {
    const headers = this.hearders();
    return this.http.get(`${GLOBAL.url}products`, { headers });
  }

  createProducto(category:any): Observable<any> {
    const headers = this.hearders();
    return this.http.post(`${GLOBAL.url}products`, category ,{ headers });
  }

  updateProducto(category:any,id:any): Observable<any> {
    const headers = this.hearders();
    return this.http.post(`${GLOBAL.url}products/${id}`, category ,{ headers });
  }

  deleteProducto(id:any): Observable<any> {
    const headers = this.hearders();
    return this.http.delete(`${GLOBAL.url}products/${id}` ,{ headers });
  }


}
