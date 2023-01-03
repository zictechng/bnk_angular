import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{


  tutorials: any[] = [];
  dataResult: any = {};
  currentIndex = -1;
  title = '';

  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];

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


  // getRequestParams(searchTitle: string, page: number, pageSize: number): any {
  //   let params: any = {};

  //   if (searchTitle) {
  //     params[`title`] = searchTitle;
  //   }

  //   if (page) {
  //     params[`page`] = page - 1;
  //   }

  //   if (pageSize) {
  //     params[`size`] = pageSize;
  //   }

  //   return params;
  // }

  // retrieveTutorials(): void {
  //   const params = this.getRequestParams(this.title, this.page, this.pageSize);

  //   this.dataResult.getAll(params)
  //   .subscribe(
  //     response => {
  //       const { tutorials, totalItems } = response;
  //       this.tutorials = tutorials;
  //       this.count = totalItems;
  //       console.log(response);
  //     },
  //     error => {
  //       console.log(error);
  //     });
  // }

  // handlePageChange(event: number): void {
  //   this.page = event;
  //   this.retrieveTutorials();
  // }

  // handlePageSizeChange(event: any): void {
  //   this.pageSize = event.target.value;
  //   this.page = 1;
  //   this.retrieveTutorials();
  // }

  // searchTitle(): void {
  //   this.page = 1;
  //   this.retrieveTutorials();
  // }

  accountStatement(){
    this.loading = true
    this._auth.accountStatement().subscribe(res =>{
      this.statementData = res;

      this.loading = false
    });
  }
}


