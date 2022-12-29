import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
//import{ Chart } from 'chart.js';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  template: `<canvas #myCanvas></canvas>`,
})
export class HomeComponent implements OnInit{
  datasets = [
    {
      label: 'Traffic',
      data: [2112, 2343, 2545, 3423, 2365, 1985, 987],
    },
  ];
  labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];


  myInfo:any;
  userDa = (JSON.parse(localStorage.getItem('userData')));
  myData:any = {};
  myTransaction:any
  maskAccNumber:any = '';
  lastFiv:String = '';

  constructor(private _auth: AuthService){}



  ngOnInit(): void {
    this.getUserData();
    this.getMyData();
    this.getMyIncomeFlow();
  }

  getUserData(){
    let myInfo = localStorage.getItem('userData');
    }

  // get loggin user profile details here
  getMyData(){
    this._auth.getMyData(this.userDa._id).subscribe(res =>{
      this.myData = res.others;
      this.lastFiv = String(this.myData.acct_number).slice(-4)
      this.maskAccNumber = "******" + this.lastFiv;
    });
  }

  getMyIncomeFlow(){
    this._auth.getMyIncomeFlow(this.userDa._id).subscribe(res =>{
      this.myTransaction = res;
    });
  }
}
