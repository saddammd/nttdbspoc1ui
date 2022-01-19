import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../classes/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  productsbaseUrl:string = environment.productsbaseUrl;

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>(this.productsbaseUrl);
  }

  addProduct(product:Product): Observable<any> {
    return this.http.post<Product>(`${this.productsbaseUrl}`, product);
  }

  updateProduct(product:Product): Observable<any> {
    return this.http.put<Product>(`${this.productsbaseUrl}`, product);
  }

  deleteProduct(id:number){
    return this.http.delete(this.productsbaseUrl+"/"+id);
  }

  searchProduct(keyword:string):Observable<any> {
    return this.http.get<any>(this.productsbaseUrl+"?keyword="+keyword);
  }

}
