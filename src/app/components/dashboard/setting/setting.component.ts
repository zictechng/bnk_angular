import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit{

  pager: any = {}
  pagers: any [] = []

  paginationStatementData:any [] = [];
  loading:Boolean = false;

  pageNumber:number = 1;
  pageSize: number = 5;
  totalPage: number = 0;
  totalDoc: number = 0;
  nextPage: any = 0;
  hasNextPage: boolean = false;
  hasPrevPage: boolean = false;
  prevPage:any
  currentPage: number = 1

  currentPageItem: number = 1;
  totalPageItem: number = this.pageSize;

  constructor(private _auth: AuthService){}

  ngOnInit(): void {
  this.paginateStatement();
  }

  paginateStatement(){
    this.loading = true
    this._auth.statementPagination(this.pageNumber, this.pageSize)
      .subscribe((res: any) =>{
      this.paginationStatementData = res.docs;
      this.pager = res;
      this.totalDoc = res.totalDocs;
      this.pagers = res;
      this.hasNextPage = res.hasNextPage;
      this.totalPage = res.totalPages;
      // console.log(res);
      // console.log(res.totalDocs, res.hasNextPage);
      // console.log(this.pager);
      this.loading = false
    });
  }
      //angular event pagination call
      pageChangeEvent(event: number){
        this.pageNumber = event;
        console.log(this.pageNumber);
        this.paginateStatement();
      }

      // pagination next button
      nextPageFetch(){
        this.pageNumber = this.pageNumber + 1;
        this.currentPageItem = this.currentPageItem + this.pager.limit;
        this.totalPageItem = this.totalPageItem + this.pager.limit
        this.paginateStatement();
      }
      //pagination last button click call
      lastPageFetch(){
        this.pageNumber = this.totalPage
        this.currentPageItem = this.pager.totalPages * this.pager.limit;
        this.totalPageItem = this.pager.totalDocs
        this.paginateStatement();
      }
      //pagination first button click call
      firstPageFetch(){
        this.pageNumber = 1
        this.currentPageItem = 1;
        this.totalPageItem = this.pageSize
        this.paginateStatement();
      }
      //pagination previous button click call
      previousPageFetch(){
        this.pageNumber = this.pageNumber - 1;
        this.currentPageItem = this.currentPageItem - this.pager.limit;
        this.totalPageItem = this.totalPageItem - this.pager.limit
        this.paginateStatement();
      }
}
