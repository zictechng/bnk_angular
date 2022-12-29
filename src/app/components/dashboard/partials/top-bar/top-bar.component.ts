import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit{

  myuUserInfo:any = {};
  myuDetails:any;

  constructor(public _authService: AuthService,
    private _router: Router){}

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails(){
    this.myuUserInfo = localStorage.getItem('userData');
    this.myuDetails = (JSON.parse(this.myuUserInfo));
    //console.log('LoggedUser', this.myuDetails);
  }


  logoutUser(){
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    this._router.navigate(['/login']);
  }
}
