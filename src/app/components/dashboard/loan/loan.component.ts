import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent implements OnInit{

  Students: any;
  allStudents: number = 0;
  pagination: number = 1;
  pageSize: number = 3;


  pager:any = {currentPage: 1, total: 0};
  page: number = 1;
  pageType: string = 'first';
  totalPages: number = 1;
  dataSource: any;
  currentPage: any;


  constructor(private _auth:AuthService,
    private _router: Router,
    private _toastr: ToastrService){}

  //pagination start here
  currentPageNumber: number = 1;

  // Fetch next page data
  next() {
    this.getData(this.currentPageNumber + 1)
  }

  // Fetch previous page data
  prev() {
    this.getData(this.currentPageNumber - 1)
  }

  // Fetch data from API
  getData(pageNo: any) {
    // Fetch API
  }

  ngOnInit(): void {
    this.fetchStudents();

  }

  fetchStudents() {
    this._auth.getHistoryDetails(this.pagination)
    .subscribe((res: any) => {
      this.Students = res;
      this.allStudents = res.total;
      console.log(res.total);
    });
  }
  renderPage(event: number) {
    this.pagination = event;
    this.fetchStudents();
  }

}
