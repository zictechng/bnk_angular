import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private Injector: Injector) { }

// the method to verify token if is valid

intercept(req:any, next:any){
  let authService = this.Injector.get(AuthService)
  let tokenizedReq = req.clone({
    setHeaders:{
      Authorization: `Bearer ${authService.getToken()}`
    }
  });
  return next.handle(tokenizedReq)
}

}
