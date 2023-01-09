import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import {Chart, registerables} from 'node_modules/chart.js';
Chart.register(...registerables);

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

  // chart properties
  chartdata:any;
  labeldata:any[]=[];
  realdata:any[]=[];
  colordata:any[]=[];

  constructor(private _auth: AuthService){
  }
  obj2 = ''+this.userDa._id // get the current logged user ID

  ngOnInit(): void {
    this.accountHistoryWallet();
    this.getMyData();
    this.getMyIncomeFlow();
    this.getChartFinance();
  }

  RenderChart(labeldata:any, maindata:any, colordata:any, type:any, id:any){
    const myChart = new Chart(id, {
      type: type,
      data: {
          labels: labeldata,
          datasets: [{
              label: 'Transaction Flow',
              data: maindata,
              backgroundColor: colordata,
              borderColor: ['#D2D2D2'],
              borderWidth: 1,
              borderRadius: 5,
          },
        ],
      },
  });
  }

  // get chart details from the api call here...
  getChartFinance(){
    this._auth.walletDailyFinance(this.userDa._id)
    .subscribe(res =>{
     // console.log(res);
     this.chartdata = res;
    if(this.chartdata!=null){
       for(let i=0; i<this.chartdata.length; i++){
        if(this.chartdata[i]._id == 'Credit'){
          this.colordata.push('#1EAAE7')
        }
        else if(this.chartdata[i]._id == 'Debit'){
          this.colordata.push('orange')
        }
         this.labeldata.push(this.chartdata[i]._id)
         this.realdata.push(this.chartdata[i].totalAmount)
       }
       this.RenderChart(this.labeldata, this.realdata, this.colordata, 'pie', 'piechart');
       }
   });
  }

  accountHistoryWallet(){
    this._auth.accountHistoryWallet(this.userDa._id).subscribe(res =>{
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
