import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit{

  userDetails:any = {};

  constructor(public _authService: AuthService,
    private _router: Router){}

  ngOnInit(): void {
    this.getUserDetails()
    console.log(localStorage.getItem('user_details'));
  }

  getUserDetails(){
    //this.userDetails = localStorage.getItem('token');
    console.log(this.userDetails);
    console.log(localStorage.getItem('user_details'));
  }


  logoutUser(){
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
  }
}
