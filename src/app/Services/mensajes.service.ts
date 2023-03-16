import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './global.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  constructor(private http: HttpClient) { }

  hearders() {
    const token = localStorage.getItem('token');
    return { Authorization: `Bearer ${token}` };
  }

  createMenssage(messege:any): Observable<any> {
    const headers = this.hearders();
    return this.http.post(`${GLOBAL.url}messeges`, messege ,{ headers });
  }
  
  getAllMenssage(): Observable<any> {
    const headers = this.hearders();
    return this.http.get(`${GLOBAL.url}messeges` ,{ headers });
  }

}
