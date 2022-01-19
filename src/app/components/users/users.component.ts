import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/classes/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users:Users[];
  userId:number;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.showUsers();
  }

  showUsers(){
    this.usersService.getusers().subscribe(
      data=>{
        this.users = data;
      }
    );
  }

  getUserId(userId:number){
    this.userId = userId;
    console.log(this.userId);
  }

  
  deleteUser(){
    this.usersService.deleteUser(this.userId).subscribe(
      data=>{
        this.showUsers();
        this.hideModal();
         }
         
    );
  }

  hideModal():void {
    document.getElementById('close-modal2').click();
  }
}

