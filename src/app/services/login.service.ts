import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../classes/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl:string = "http://3.109.194.186:5000/poc/login";

  loginvalues: Login = new Login();
  loggedInUseremail: string;
  

  constructor(private http: HttpClient) { }

  login(login:Login): Observable<any> {
    this.loginvalues=login;
    return this.http.post<Login>(`${this.baseUrl}`, login, {responseType: 'text' as 'json'});
  }

  isLoggedIn():boolean{
   let tokenPresence:boolean = !!localStorage.getItem("token");
   return tokenPresence;
  }

  getToken(){
    return localStorage.getItem("token");
  }

}
