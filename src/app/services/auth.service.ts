import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = "http://localhost:3000/api/register";
  private _login = "http://localhost:3000/api/login";
  private _transferfundUrl = "http://localhost:3000/api/sendfund"

  constructor(private http: HttpClient,
    private _router: Router) { }


  // register method that process the registration
  registerUser(user:any){
    return this.http.post<any>(this._registerUrl, user);
  }

  // register method that process the registration
  loginUser(user:any){
    return this.http.post<any>(this._login, user);
  }

  loggedIn(){
    return !! localStorage.getItem('token'); // then !! mean is a boolean operation to return
    // true or false
  }
// method/function to logout users

  // method to get token from localstorage
getToken(){
  return localStorage.getItem('token');
}

// register method that process the registration
transferFund(user:any){
  return this.http.post<any>(this._transferfundUrl, user);
}
}
