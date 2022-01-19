import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Register } from 'src/app/classes/register';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

register: Register = new Register();

  constructor(private registerService:RegisterService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.register);
    this.registerUser();
  }

  registerUser(){
    this.registerService.registerUser(this.register).subscribe(
      data=>{
        this.router.navigate(["/login"]);
      }
    );
  }

}
