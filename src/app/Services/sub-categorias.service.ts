import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './global.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubCategoriasService  {

  token: string = String(localStorage.getItem('token'));

  constructor(private http: HttpClient) { }

  hearders() {
    const token = localStorage.getItem('token');
    return { Authorization: `Bearer ${token}` };
  }

  getAllSubcategories(): Observable<any> {
    const headers = this.hearders();
    return this.http.get(`${GLOBAL.url}subcategories`, { headers });
  }

  getAllSubcategoriesForID(categoria_id:any): Observable<any> {
    const headers = this.hearders();
    return this.http.get(`${GLOBAL.url}subcategories/ForCategory?categoria_id=${categoria_id}`, { headers });
  }


  createSubcategories(category:any): Observable<any> {
    const headers = this.hearders();
    return this.http.post(`${GLOBAL.url}subcategories`, category ,{ headers });
  }

  updateSubcategories(category:any,id:any): Observable<any> {
    const headers = this.hearders();
    return this.http.post(`${GLOBAL.url}subcategories/${id}`, category ,{ headers });
  }

  deleteSubcategories(id:any): Observable<any> {
    const headers = this.hearders();
    return this.http.delete(`${GLOBAL.url}subcategories/${id}` ,{ headers });
  }

}
