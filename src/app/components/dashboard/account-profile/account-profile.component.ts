import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.css']
})
export class AccountProfileComponent  implements OnInit{


  userDa = (JSON.parse(localStorage.getItem('userData')));
  myData:any = {}
  constructor(private _auth: AuthService){}

  obj2 = ''+this.userDa._id // get the current logged user ID


  ngOnInit(): void {
    this.getMyData();
  }

  // get user profile details here
  getMyData(){
    this._auth.getMyData(this.userDa._id).subscribe(res =>{
      this.myData = res.others;
      //console.log(this.myData);
    });
  }

}
