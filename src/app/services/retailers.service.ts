import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Retailers } from '../classes/retailers';
import { AddRetailers } from '../classes/add-retailers';
import { EditRetailers } from '../classes/edit-retailers';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RetailersService {

retailersbaseUrl:string = environment.retailersbaseUrl;

  constructor(private http: HttpClient) { }

  getretailers(id:Number): Observable<any> {
    return this.http.get<any>(this.retailersbaseUrl+id);
  }

  getretailer(productid:Number, retailerid:number):Observable<Retailers> {
    return this.http.get<Retailers>(this.retailersbaseUrl+productid+"/?retailerid="+retailerid);
  }

  updateRetailer(editRetailers:EditRetailers):Observable<Retailers>{
    return this.http.put<Retailers>(`${this.retailersbaseUrl}`,editRetailers);
  }

  addRetailer(addretailers:AddRetailers):Observable<Retailers>{
    return this.http.post<Retailers>(`${this.retailersbaseUrl}`,addretailers);
  }

  deleteRetailer(id:number):Observable<any>{
    return this.http.delete<any>(`${this.retailersbaseUrl}`+id);
  }

  searchRetailer(productid:Number, keyword:string):Observable<any> {
    return this.http.get<any>(this.retailersbaseUrl+"?id="+productid +"&keyword=" +keyword);
  }

}
