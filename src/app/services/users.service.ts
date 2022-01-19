import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  usersbaseUrl:string = environment.usersbaseUrl;
  constructor(private http: HttpClient) { }

  getusers(): Observable<any> {
    return this.http.get<any>(this.usersbaseUrl +"showusers");
  }

  getuser(userId:number): Observable<any> {
    return this.http.get<any>(this.usersbaseUrl +"showuser" +userId);
  }


  deleteUser(userId:number){
    return this.http.delete(this.usersbaseUrl +"user/" +userId);
  }
}