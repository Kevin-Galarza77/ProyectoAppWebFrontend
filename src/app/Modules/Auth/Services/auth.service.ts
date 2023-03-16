import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from 'src/app/Services/global.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }




  login(user: any): Observable<any> {

    return this.http.post(`${GLOBAL.url}login`, user);

  }


  logout(): Observable<any> {

    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` }

    return this.http.post(`${GLOBAL.url}logout`, {  }, { headers });

  }

  changePassword(user:any): Observable<any> {

    const token = localStorage.getItem('token');
    const user_id = localStorage.getItem('user_id');
    const headers = { Authorization: `Bearer ${token}` }

    return this.http.put(`${GLOBAL.url}user/${user_id}`, user , { headers });

  }

  forgotPassword(email:string): Observable<any> {
    
    return this.http.post(`${GLOBAL.url}password/forgot?email=${email}`,{});

  }


  resetPassword(data:any,token:any): Observable<any>{
    return this.http.post(`${GLOBAL.url}password/reset?email=${data.email}&password=${data.password}&repeat_password=${data.repeat_password}&token=${token}`,{});
  }






}
