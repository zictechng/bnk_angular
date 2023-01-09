import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-account-statement',
  templateUrl: './account-statement.component.html',
  styleUrls: ['./account-statement.component.css']
})
export class AccountStatementComponent implements OnInit{

  recordId:any = '';
  myId : any = localStorage.getItem('userData');
  statementData:any[] = [];
  loading:Boolean = false;

  pageNumber:number = 1;
  pageSize: number = 3;

  paginationStatementData:any [] = [];

  constructor(private _auth: AuthService,
    private _router: Router,
    private _toastr: ToastrService){}


  ngOnInit(): void {
    this.accountStatement();
  }

  accountStatement(){
    this.loading = true
    this._auth.accountStatement().subscribe(res =>{
      this.statementData = res;
      this.loading = false
    });
  }



}
