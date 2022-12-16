import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit{

  loginUserData:any = {};// this will hold values coming from the html input at once and
  details:any;
  // then send it to the service which in turn send it to api endpoint and save to db

  constructor(private _auth: AuthService,
    private _router: Router){}

  ngOnInit(): void {

  }

// login method here
loginUser(){
  this._auth.loginUser(this.loginUserData).
  subscribe(res =>{

    localStorage.setItem('token', res.token);
   //console.log(res);

    this._router.navigate(['/dashboard']);
  },
    err => console.log(err)
  );
  //console.log(this.loginUserData);
    // test if data is coming from the login html page
}

}
