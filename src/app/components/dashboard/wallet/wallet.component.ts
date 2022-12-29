import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit{


  //myId : any = localStorage.getItem('userData');
  userDa = (JSON.parse(localStorage.getItem('userData')));
  historyData:any[] = [];
  myData:any = {}
  myTransaction:any
  myTransactionInflow:any = {}
  myInflow:any = '';
  maskAccNumber:any = '';
  lastFiv:String = '';



  constructor(private _auth: AuthService){
  }
  obj2 = ''+this.userDa._id // get the current logged user ID

  ngOnInit(): void {
    this.historyStatement();
    this.getMyData();
    this.getMyIncomeFlow();

  }


  historyStatement(){
    this._auth.accountHistory().subscribe(res =>{
      this.historyData = res;
    });
  }
  // get user profile details here
  getMyData(){
    this._auth.getMyData(this.userDa._id).subscribe(res =>{
      this.myData = res.others;
      this.myTransactionInflow = res.userTransacSuccess;
      this.lastFiv = String(this.myData.acct_number).slice(-4)
      this.maskAccNumber = "******" + this.lastFiv;
      //console.log(this.maskAccNumber);

    });
  }

  getMyIncomeFlow(){
    this._auth.getMyIncomeFlow(this.userDa._id).subscribe(res =>{
      this.myTransaction = res;
    });
  }
}
