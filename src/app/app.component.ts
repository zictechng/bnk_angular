import { Component, OnInit, Output } from '@angular/core';
declare let $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'website';

  myUserInfo:any = {};
  myDetails:any;

  ngOnInit(): void {
    this.getUserData();
  }
  getUserData(){
    this.myUserInfo = localStorage.getItem('userData');
     this.myDetails = (JSON.parse(this.myUserInfo));
    //console.log('LoggedUser', this.myDetails);
  }
}
