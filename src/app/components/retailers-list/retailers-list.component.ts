import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddRetailers } from 'src/app/classes/add-retailers';
import { EditRetailers } from 'src/app/classes/edit-retailers';
import { Retailers } from 'src/app/classes/retailers';
import { Roles } from 'src/app/classes/roles';
import { LoginService } from 'src/app/services/login.service';
import { RetailersService } from 'src/app/services/retailers.service';
import { RolesService } from 'src/app/services/roles.service';

@Component({
  selector: 'app-retailers-list',
  templateUrl: './retailers-list.component.html',
  styleUrls: ['./retailers-list.component.css']
})
export class RetailersListComponent implements OnInit {

  constructor(private retailersService: RetailersService, private route: ActivatedRoute,
    private loginService:LoginService, private rolesService:RolesService) { }

  retailersArray: Retailers;
  retailer: Retailers = new Retailers();
  addRetailers: AddRetailers = new AddRetailers();
  editRetailers: EditRetailers = new EditRetailers();
  retailerId: number;
  searchKeyword:string;
  public roles:Roles[];
  maxRoleValue:Roles;



  productid: number = +this.route.snapshot.paramMap.get('id');

  ngOnInit(): void {
    this.getRetailersList(this.productid);

  }

  getRetailersList(id: Number) {
    this.getUserRoles();
    this.retailersService.getretailers(id).subscribe(
      data => {
        this.retailersArray = data;
      }
    );
  }

  getRetailerDetail(id: number) {
    this.retailersService.getretailer(this.productid, id).subscribe(
      data => {
        this.retailer = data;
        console.log(this.retailer);
      }
    )
  }

  addRetailer() {
    this.addRetailers.products = this.productid;
    this.addRetailers.retailerId = 0;
    console.log(this.addRetailers);
    this.retailersService.addRetailer(this.addRetailers).subscribe(
      data => {
        this.getRetailersList(this.productid);
        this.addRetailers = new AddRetailers();
        this.hideModal2();
      }

    )
  }
  saveUpdateRetailerChanges() {
    console.log(this.productid);
    this.editRetailers.products = this.productid;
    this.editRetailers.retailerId = this.retailer.retailerId;
    this.editRetailers.retailerName = this.retailer.retailerName;
    this.editRetailers.location = this.retailer.location;
    console.log(this.editRetailers.products + this.editRetailers.retailerId + this.editRetailers.retailerName
      + this.editRetailers.location);

    this.retailersService.updateRetailer(this.editRetailers).subscribe(
      data => {
        this.getRetailersList(this.productid);
        this.hideModal();

      }
    );

  }

  getRetailerId(id: number) {
    this.retailerId = id;
  }

  deleteRetailer(){
    this.retailersService.deleteRetailer(this.retailerId).subscribe(
      data=>{
        this.getRetailersList(this.productid);
        this.hideModal3();
        });
  }

  assignSearchValue(value:any){
    this.searchKeyword = value;
  }

  searchRetailer(){
    console.log(this.productid +this.searchKeyword);
       this.retailersService.searchRetailer(this.productid, this.searchKeyword).subscribe(
      data=>{ 
        this.retailersArray = data;
      }
    );

  }

  hideModal(): void {
    document.getElementById('close-modal-editretailer').click();
  }

  hideModal2(): void {
    document.getElementById('close-modal-addretailer').click();
  }

  hideModal3(): void {
    document.getElementById('close-modal-delete').click();
  }

  getUserRoles(){
    this.rolesService.getUserRoles(this.loginService.loginvalues.username).subscribe(
      result=>{ 
        
        this.roles = result;
        let val = Math.max.apply(Math,this.roles.map(function(o){return o.roleId}));
        for(let arr of this.roles){
          if(arr.roleId == val){
            this.maxRoleValue = arr;
          }
        }
        }
    );
}


logout(){
  localStorage.removeItem('token');
}


}
