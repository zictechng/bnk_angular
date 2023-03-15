import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit{

 public myuUserInfo:any = {};
 public myuDetails:any;
  userDa = (JSON.parse(localStorage.getItem('userData')));
  userDatas:any;
  myProfilePhoto = '';
  defaultPhoto:String ="";


  constructor(public _authService: AuthService,
    private _router: Router){}

    // receive data details from parent component here
    @Input() allNotification: Number = 0;
    @Input() allMessage: Number = 0;
    @Input() myProfilePic = '';
    @Input() profileDefaultPhoto = '';

    ngOnInit(): void {
    this.getUserDetails();
    this.getMyData();
    this.profileDefaultPhoto = this._authService.getDefaultImage();

    //console.log(this.defaultPhoto);
  }


  getUserDetails(){
    this.myuUserInfo = localStorage.getItem('userData');
    this.myuDetails = (JSON.parse(this.myuUserInfo));
    //console.log('LoggedUser', this.myuDetails);
  }

// get user profile details here
getMyData(){
  this._authService.getMyData(this.userDa._id).subscribe(res =>{
    this.userDatas = res.others;
    this.myProfilePhoto = this._authService.serverURL+res.others.photo;
    this.myProfilePic = this._authService.serverURL+res.others.photo;
    //console.log(this.userDatas)
  });
}

  logoutUser(){
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    this._router.navigate(['/login']);
  }
}
