import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Register } from '../classes/register';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {


  registerbaseUrl:string = environment.retailersbaseUrl;

  constructor(private http: HttpClient) { }

  registerUser(register:Register): Observable<any> {
    return this.http.post<any>(`${this.registerbaseUrl}`,register);
  }


}
