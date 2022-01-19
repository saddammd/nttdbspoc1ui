import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Roles } from '../classes/roles';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

    rolesbaseUrl:string = environment.rolesbaseUrl;

  constructor(private http: HttpClient) { }

  getUserRoles(email:string): Observable<Roles[]> {
    return this.http.get<Roles[]>(`${this.rolesbaseUrl}` +email);
  }

  updateUserRoles(email:string, rolesId:string): Observable<any>{
    console.log(`${this.rolesbaseUrl}`, email +`${rolesId}`)
    return this.http.put<any>(this.rolesbaseUrl +email,`${rolesId}`);
  }
}
