import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { RouterModule, Routes } from '@angular/router';
import { RetailersListComponent } from './components/retailers-list/retailers-list.component';
import { FormsModule } from '@angular/forms';
import { UsersComponent } from './components/users/users.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard';
import { TokeninterceptorService} from './services/tokeninterceptor.service';
import { RecaptchaModule } from "ng-recaptcha";
import { LogoutComponent } from './components/logout/logout.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import { RegisterComponent } from './components/register/register.component';
import { RolesComponent } from './components/roles/roles.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {GoogleLoginProvider} from 'angularx-social-login';

const routes: Routes = [
  { path: 'retailers/:id', component:RetailersListComponent,canActivate:[AuthGuard] },
  { path: 'home', component:ProductsListComponent,canActivate:[AuthGuard]},
  { path: 'users', component:UsersComponent,canActivate:[AuthGuard]},
  { path: 'roles/:email', component:RolesComponent,canActivate:[AuthGuard] },
  { path: 'login', component:LoginComponent},
  { path: 'logout', component:LogoutComponent},
  { path: 'register', component:RegisterComponent},
  { path: '', component:ProductsListComponent,canActivate:[AuthGuard]},
  { path: '**', component:ProductsListComponent,canActivate:[AuthGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    ProductsListComponent,
    RetailersListComponent,
    UsersComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    RolesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    RecaptchaModule,
    NoopAnimationsModule,
    MatTableModule,
    MatSortModule,
    SocialLoginModule
    
    ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokeninterceptorService, multi: true},
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('829651344122-mmsu6j8se1oo3nhso6e24702fpk74ijs.apps.googleusercontent.com')
          },
        ]
      } as SocialAuthServiceConfig,
    }],
  bootstrap: [AppComponent, AuthGuard]
})
export class AppModule { }
