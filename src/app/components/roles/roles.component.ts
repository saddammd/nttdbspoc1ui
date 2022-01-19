import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Roles } from 'src/app/classes/roles';
import { RolesService } from 'src/app/services/roles.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {


  rolesArray:Roles[];
  roles:Roles = new Roles();
  email:string = this.route.snapshot.paramMap.get('email');
  adminChecked:boolean = false;
  superuserChecked:boolean=false;
  userChecked:boolean=false;
  uservalue:number;
  adminValue:number;
  superuservalue:number;
  combinevalue:string;

  constructor(private rolesService:RolesService, private route:ActivatedRoute, private userService:UsersService) { }

  ngOnInit(): void {
    this.getUserRole();
   }

 
  getUserRole(){
    this.rolesService.getUserRoles(this.email).subscribe(
      data=>{
        this.rolesArray=data;
        this.checkRoles();
      }
      
    );
  }


  closeModal(){
    document.getElementById('close-modal').click();
  }

  checkRoles(){

    for(let r of this.rolesArray){

      if((r.roleName === "ADMIN")&&(!this.adminChecked)){
        this.roles.roleName = r.roleName;
        this.adminChecked=true;
      }

      else if((r.roleName ==="SUPERUSER")&&(!this.superuserChecked)){
        this.roles.roleName = r.roleName;
        this.superuserChecked=true;
      }

      else if((r.roleName === "USER")&&(!this.userChecked)){
        this.roles.roleName = r.roleName;
        this.userChecked=true;
      }

    }
  }

   updateUserRoles(){
     this.rolesService.updateUserRoles(this.email, this.combinevalue).subscribe(
       data=>{
        this.getUserRole();
       }
     );
     
   
  }


  onChangeAdmin(){
    if(this.adminChecked){
      this.adminChecked=true;
      console.log("value changed in if " +this.adminChecked);
    }
    else{
      this.adminChecked=false;
      console.log("value changed in else " +this.adminChecked);
    }
    this.updateRoles();
    }

    onChangeSuperUser(){
      if(this.superuserChecked){
        this.superuserChecked = true;
        console.log("value changed in if " +this.superuserChecked);
      }
      else{
        this.superuserChecked=false;
        console.log("value changed in else " +this.superuserChecked);
      }
      this.updateRoles();
    }

    onChangeUser(){
      if(this.userChecked){
        this.userChecked = true;
        console.log("value changed in if " +this.userChecked);
      }
      else{
        this.userChecked=false;
        console.log("value changed in else " +this.userChecked);
      }
      this.updateRoles();
      }

      updateRoles(){
        this.setRolesValue();
        this.combinevalue = this.adminValue.toString().concat(",").concat(this.superuservalue.toString()).concat(",").concat(this.uservalue.toString());
        console.log(this.combinevalue);
      }

      setRolesValue(){
        if(this.adminChecked==true){
          this.adminValue = 3;
        }
        else{
          this.adminValue=0;
        }

        if(this.superuserChecked==true){
          this.superuservalue = 2;
        }
        else{
          this.superuservalue=0;
        }
        if(this.userChecked==true){
          this.uservalue = 1;
        }
        else{
          this.uservalue = 0;
        }

      }

    
      

  logout(){
    localStorage.removeItem('token');
  }
}
