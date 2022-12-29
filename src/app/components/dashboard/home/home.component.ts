import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

//import{ Chart } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit{

  chart: any;

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

  // chartOptions = {
  //   title: {
  //     text: "Basic Column Chart in Angular"
  //   },
  //   data: [{
  //     type: "column",
  //     dataPoints: [
  //       { label: "Apple",  y: 10  },
  //       { label: "Orange", y: 15  },
  //       { label: "Banana", y: 25  },
  //       { label: "Mango",  y: 30  },
  //       { label: "Grape",  y: 28  }
  //     ]
  //   }]

  // };
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

