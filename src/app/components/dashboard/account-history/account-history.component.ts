import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account-history',
  templateUrl: './account-history.component.html',
  styleUrls: ['./account-history.component.css']
})
export class AccountHistoryComponent implements OnInit{

  recordId:any = '';
  myId : any = localStorage.getItem('userData');
  historyData:any[] = [];

  constructor(private _auth: AuthService,
    private _router: Router,
    private _toastr: ToastrService){}


  ngOnInit(): void {
    this.historyStatement()
  }

  historyStatement(){
    this._auth.accountHistory().subscribe(res =>{
      this.historyData = res;

    });

  }

}
