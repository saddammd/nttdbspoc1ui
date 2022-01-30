import { Injectable} from '@angular/core';
import {HttpInterceptor} from '@angular/common/http';
import {catchError} from 'rxjs/operators'; 
import { of } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class TokeninterceptorService implements HttpInterceptor{

  constructor(private router: Router) { }
  intercept(req, next) {
    let tokenizeRequest = req.clone({
      setHeaders: {Authorization: `Bearer ${localStorage.getItem('token')}`}
      //setHeaders: {Authorization: `Bearer ${sessionStorage.getItem("token")}`}
    });
    
    return next.handle(tokenizeRequest).pipe(catchError((err, caught) => {
          if (err.status === 500){
            this.handleAuthError();
            return of(err);
          }
          throw err;
        }
    )
    );
  }

  private handleAuthError() {
    console.log("Auth error in token interceptor")
    localStorage.clear();
    this.router.navigate(['/']);
  }

}

