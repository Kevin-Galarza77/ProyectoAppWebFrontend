import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from 'src/app/Services/global.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }




  login(user:any):Observable<any>{

    return this.http.post(`${GLOBAL.url}login`,user);
  
  }






}
