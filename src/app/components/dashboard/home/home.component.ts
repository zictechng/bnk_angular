import { map } from 'rxjs/operators';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import {Chart, registerables} from 'node_modules/chart.js';
Chart.register(...registerables);

//import{ Chart } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit{

  chart: [];

  // chartdata:any;

  // labeldata:any[]=[];
  // realdata:any[]=[];
  // colordata:any[]=[];

  myInfo:any;
  userDa = (JSON.parse(localStorage.getItem('userData')));
  myData:any = {};
  myTransaction:any
  maskAccNumber:any = '';
  lastFiv:String = '';
  mydate: any;
  pipe: any;

  constructor(private _auth: AuthService){}

  ngOnInit(): void {
    this.getUserData();
    this.getMyData();
    this.getMyIncomeFlow();
    //this.getFinance();
  }
  // RenderChart(labeldata:any, maindata:any, colordata:any, type:any, id:any){
  //   const myChart = new Chart(id, {
  //     type: type,
  //     data: {
  //         labels: labeldata,
  //         datasets: [{
  //             label: 'Account Flow',
  //             data: maindata,
  //             backgroundColor: colordata,
  //             borderColor: ['#D2D2D2'],
  //             borderWidth: 1,
  //             borderRadius: 5,
  //         },
  //       //   {
  //       //     label: 'Credit 2',
  //       //     data: maindata,
  //       //     backgroundColor: '#E69500',
  //       //     borderColor: ['#D2D2D2'],
  //       //     borderWidth: 1,
  //       //     borderRadius: 5,
  //       // }
  //       ],
  //     },
  //     options: {
  //         scales: {
  //             y: {
  //                 beginAtZero: true
  //             }
  //         },
  //     }
  // });
  // }
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

  // getFinance(){
  //   this._auth.dailyFinance().subscribe(res =>{
  //     this.chartdata = res;
  //     //console.log(this.labeldata)
  //     if(this.chartdata!=null){
  //       for(let i=0; i<this.chartdata.length; i++){
  //         //console.log(this.chartdata[i]);
  //         this.labeldata.push(this.chartdata[i].tr_year)
  //         this.realdata.push(this.chartdata[i].amount)
  //         this.colordata.push(this.chartdata[i].colorcode)
  //       }
  //       this.RenderChart(this.labeldata, this.realdata, this.colordata, 'bar', 'barchart');
  //       this.RenderChart(this.labeldata, this.realdata, this.colordata, 'pie', 'piechart');
  //       this.RenderChart(this.labeldata, this.realdata, this.colordata, 'line', 'dochart');
  //       }
  //   });
  // }

  // RenderChart2(){
  //   const myChart = new Chart('piechart', {
  //     type: 'bar',
  //     data: {
  //         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  //         datasets: [{
  //             label: '# of Votes',
  //             data: [12, 19, 3, 5, 2, 3],
  //             backgroundColor: [
  //                 'rgba(255, 99, 132, 0.2)',
  //                 'rgba(54, 162, 235, 0.2)',
  //                 'rgba(255, 206, 86, 0.2)',
  //                 'rgba(75, 192, 192, 0.2)',
  //                 'rgba(153, 102, 255, 0.2)',
  //                 'rgba(255, 159, 64, 0.2)'
  //             ],
  //             borderColor: [
  //                 'rgba(255, 99, 132, 1)',
  //                 'rgba(54, 162, 235, 1)',
  //                 'rgba(255, 206, 86, 1)',
  //                 'rgba(75, 192, 192, 1)',
  //                 'rgba(153, 102, 255, 1)',
  //                 'rgba(255, 159, 64, 1)'
  //             ],
  //             borderWidth: 1
  //         }]
  //     },
  //     options: {
  //         scales: {
  //             y: {
  //                 beginAtZero: true
  //             }
  //         }
  //     }
  // });
  // }


}

