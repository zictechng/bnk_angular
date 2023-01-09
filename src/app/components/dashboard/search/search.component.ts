import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{


  recordId:any = '';
  myId : any = localStorage.getItem('userData');
  statementData:any[] = [];
  loading:Boolean = false;
  public searchName :any
  constructor(private _auth: AuthService,
    private _router: Router){}

  ngOnInit(): void {
      // this.retrieveTutorials();
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


