import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit{

  registerUserData:any = {}; // this holds data send from the registration UI page
constructor(private _auth: AuthService,
  private _router: Router){}


ngOnInit(){

}

// register user details here
registerUser(){
  //console.log(this.registerUserData) // testing if data is coming
  this._auth.registerUser(this.registerUserData).
  subscribe(res =>{
    //console.log(res)
    localStorage.setItem('token', res.email);
    this._router.navigate(['/login']); // after registration, go back to login page
  })
};

}
