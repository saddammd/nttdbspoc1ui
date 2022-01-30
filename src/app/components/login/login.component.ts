import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/classes/login';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { RolesService } from 'src/app/services/roles.service';
import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

login:Login = new Login();
token:any;
siteKey:string = "";
captcha:string = "";
error:string;
socialUser: SocialUser;
userLogged: SocialUser;
isLogged: boolean;

  constructor(
    private loginService:LoginService, 
    private router: Router, 
    private rolesService:RolesService,
    private authService: SocialAuthService) { }

  ngOnInit(): void {
    this.authService.authState.subscribe(
      data=>{
        this.userLogged = data;
        this.isLogged = (this.userLogged!=null);
      }
    );
    }

    signInWithGoogle(): void {
      this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
        data=>{
          this.socialUser = data;
          this.token = this.socialUser.idToken;
          localStorage.setItem('token', this.token);
          this.isLogged = true;
          localStorage.setItem('username', this.userLogged.email);
          if(this.error==null){
            this.router.navigate(['/']);
          }
     
        error=>{
          console.log(9);
          this.error=error;
          console.log(10);        
        }      
       });
      if(this.error==null){
        console.log(11);
        this.router.navigate(['/']);
        console.log(12);
      }
    }

    signOut(): void {
      this.authService.signOut();
      this.router.navigate(['/']);
    }

  onSubmit(){

    if(this.captcha!=""){
        this.doLogin();
    }
    }

  doLogin(){
      this.error=null;
      this.loginService.login(this.login).subscribe(
        response=>{
        this.token=response;
        localStorage.setItem('token', this.token);
        localStorage.setItem('username', this.loginService.loginvalues.username);
        if(this.error==null){
          this.router.navigate(['/']);
        }
      },
      error=>{
        this.error=error;        
      }      
    );
    if(this.error==null){
      this.router.navigate(['/']);
    }
}

  resolved(captchaResponse: string) {
    this.captcha = captchaResponse;
    console.log(`Resolved captcha with response: ${this.captcha}`);
  }
}
