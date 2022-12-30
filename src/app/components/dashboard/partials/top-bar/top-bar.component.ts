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
  userDa = (JSON.parse(localStorage.getItem('userData')));
  userDatas:any;
  myProfilePhoto = '';

  constructor(public _authService: AuthService,
    private _router: Router){}

  ngOnInit(): void {
    this.getUserDetails();
    this.getMyData()
  }

  getUserDetails(){
    this.myuUserInfo = localStorage.getItem('userData');
    this.myuDetails = (JSON.parse(this.myuUserInfo));
    //console.log('LoggedUser', this.myuDetails);
  }

// get user profile details here
getMyData(){
  this._authService.getMyData(this.userDa._id).subscribe(res =>{
    this.userDatas = res.others.photo;
    this.myProfilePhoto = this._authService.serverURL+res.others.photo
    console.log(this.userDatas)
  });
}

  logoutUser(){
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    this._router.navigate(['/login']);
  }
}
