import { Component, OnInit} from '@angular/core';
import { Product } from 'src/app/classes/product';
import { Products } from 'src/app/classes/products';
import { Retailers } from 'src/app/classes/retailers';
import { Roles } from 'src/app/classes/roles';
import { LoginService } from 'src/app/services/login.service';
import { ProductsService } from 'src/app/services/products.service';
import { RolesService } from 'src/app/services/roles.service';
import {Sort} from '@angular/material/sort';
import { SocialAuthService } from 'angularx-social-login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  
  products:Products[];
  sortedData: Products[];
  retailersvalue: Retailers[];
  productId:number;
  search:string;
  editProductValue:Product = new Product();
  addProductValue:Product = new Product();
  roles:Roles[];
  sortedRoles: Roles[];
  maxRoleValue:Roles;
  
  
  constructor(
    private productsService: ProductsService, 
    private loginService:LoginService, 
    private rolesService:RolesService,
    private authService: SocialAuthService,
    private router: Router,) 
  {
      
   }

  ngOnInit(): void {

    this.getProductsList();
    this.getUserRoles();
    
  }

     addProduct(productvalues: Product){
     this.addProductValue.productName = productvalues.productName;
     this.addProductValue.category = productvalues.category;
     this.addProductValue.price = productvalues.price;
     this.productsService.addProduct(this.addProductValue).subscribe(
      response=>{
     this.getProductsList();
     this.hideModal3();
     this.addProductValue = new Product();
      });   
    }

     editProduct(id:any) : void{
       this.editProductValue.id = this.products[id].id;
       this.editProductValue.productName = this.products[id].productName;
       this.editProductValue.price = this.products[id].price;
       this.editProductValue.category = this.products[id].category;
      }

     updateProduct(): void{
       this.productsService.updateProduct(this.editProductValue).subscribe(
         response=>{
         this.getProductsList();
         this.hideModal();
         });
     }

     deleteProduct(){
      this.productsService.deleteProduct(this.getProductId(this.productId)).subscribe(
        response=>{
        console.log(response);
        this.getProductsList();
        this.hideModal2();
      }
      )
    }

    assignSearchValue(val:any){
      this.search = val;
    }

    searchProduct(){
     this.productsService.searchProduct(this.search).subscribe(
        data=>{
          this.products = data;
        }
          
          );
    }

    getUserRoles(){
      if(this.loginService.loginvalues.username!=null){
      this.getloginUserRoles();
        }
        else if(this.loginService.loginvalues.username ==null){
          this.getGoogleUserRoles();
        }
     }

  getloginUserRoles(){
    this.rolesService.getUserRoles(this.loginService.loginvalues.username).subscribe(
      result=>{ 
        this.roles = result;
        this.sortedRoles = this.roles.sort(this.compare);
        this.maxRoleValue = this.sortedRoles[this.sortedRoles.length-1];
        console.log("max value is" +this.maxRoleValue);
        }
    );
  }

  getGoogleUserRoles(){
    this.loginService.loginvalues.username = this.loginService.loggedInUseremail;
    this.rolesService.getUserRoles(this.loginService.loginvalues.username).subscribe(
      result=>{ 
        this.roles = result;
        this.sortedRoles = this.roles.sort(this.compare);
        this.maxRoleValue = this.sortedRoles[this.sortedRoles.length-1];   
        }
    );
  }

     hideModal():void {
      document.getElementById('close-modal').click();
    }

    hideModal2():void {
      document.getElementById('close-modal2').click();
    }

    hideModal3():void {
      document.getElementById('close-modal3').click();
    }
     getProductId(id:number):number{
      return this.productId = id;
     }

   getProductsList(){
     this.productsService.getAll().subscribe(
      data=>{
        this.sortedData = data;
        this.products = this.sortedData;
       }

     );

   }

   logout(){
     localStorage.removeItem('token');
     this.authService.signOut();
     this.router.navigate(['/login']);
   }

   compare(a:Roles, b:Roles) {
    if ( a.roleId < b.roleId ){
      return -1;
    }
    if ( a.roleId > b.roleId ){
      return 1;
    }
    return 0;
  }



   getSortedList(){
      this.products = this.sortedData;
      }

   sortData(sort: Sort) {
    const data = this.products.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }
    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'productName':
          return compare(a.productName, b.productName, isAsc);
        case 'price':
          return compare(a.price, b.price, isAsc);
        case 'category':
          return compare(a.category, b.category, isAsc);
       default:
          return 0;
      }
    });
    this.getSortedList();
  }
}


function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}