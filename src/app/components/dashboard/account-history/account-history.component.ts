import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { range } from 'rxjs';
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
  id: any;
  selectedItems:any [];
  showSpinner: Boolean = false;

  activePage: any = 1;
  pager: any = {};

  total_count : any;

  totalRecord: number = 0;
  pagination: number = 1;
  pageSize: number = 5;
  totalPages: number = 1;

  constructor(private _auth: AuthService,
    private _router: Router,
    private _toastr: ToastrService){}


  ngOnInit(): void {
    this.historyStatement()
  }

  // getPager(totalItems:number, currentPage: number = 1, pageSize:number = 10){
  //   let totalPages = Math.ceil(totalItems/ pageSize);

  //   let startPage: number, endPage: number;
  //   if(totalPages <= 10){
  //     startPage = 1;
  //     endPage = totalPages
  //   }
  //   else{
  //     if(currentPage<=6){
  //       startPage = 1;
  //       endPage = 10;
  //     }
  //     else if(currentPage + 4 >= totalPages){
  //       startPage = totalPages - 9;
  //       endPage = totalPages
  //     }
  //     else{
  //       startPage = currentPage - 5;
  //       endPage = currentPage + 4;
  //     }
  //   }
  //   let startIndex = (currentPage -1) * pageSize;
  //   let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

  //   let pages = range(startPage, endPage +1)

  //   return {
  //     totalItems: totalItems,
  //     currentPage: currentPage,
  //     pageSize: pageSize,
  //     startPage: startPage,
  //     endPage: endPage,
  //     startIndex: startIndex,
  //     endIndex: endIndex,
  //     pages: pages
  //   };
  // }

  historyStatement(){
    this.showSpinner = true
    this._auth.accountHistory(this.pagination, this.pageSize).subscribe((res: any) =>{
      this.historyData = res.data;
      this.totalRecord = res.total_record;
      this.totalPages = window.Math.ceil(this.totalRecord/this.pageSize);
      console.log(this.totalRecord);
      this.showSpinner = false
    });
  }


  renderPage(event: number) {
    this.pagination = event;
    this.historyStatement();
  }



  //delete record from history table
  deleteHistory(id: any){
    //console.log(id);
    if (confirm("Are you sure to delete?")){
    this._auth.deleteHistory(id).subscribe(res =>{
      if(res.msg == 200){
        this._toastr.success('Deleted successfully.', 'Successful', {
          timeOut: 3000,
        });
        this.historyStatement()
      }
      else if(res.msg == 403){
        this._toastr.warning('Document not found', 'Failed', {
          timeOut: 3000,
        });
      }
      else{
        this._toastr.warning('Something went wrong', 'Failed', {
          timeOut: 3000,
        });
      }
      console.log(res);
    }, err =>{
    if(err.status == "500"){
      this._toastr.error('Server error!', 'Failed', {
        timeOut: 3000,
      });
      console.log(err.message)
    }}
    );
  }

  }

  //checkAllCheckBox(ev) {
  checkAllCheckBox(ev: any) { // Angular 13
		this.historyData.forEach(x => x.checked = ev.target.checked)
	}

  isAllCheckBoxChecked() {
		return this.historyData.every(p => p.checked);
	}

  onBtnClicked() {
    const selectedProducts = this.historyData.filter(historyData => historyData.checked).map(p => p._id);
    console.log(selectedProducts);
  }

   //delete record from history table
   deleteHistoryCheckBox(){
    const selectedProducts = this.historyData.filter(historyData => historyData.checked).map(p => p._id);
    if (confirm("Are you sure to delete?")){
      // check if user select any delete item
      if(selectedProducts.length === 0 || selectedProducts === undefined ){
        this._toastr.error('Please select item to delete.', 'Failed', {
          timeOut: 3000,
        });
      }
        else
        {
          this._auth.deleteHistoryCheckBox(selectedProducts).subscribe(res =>{
          if(res.msg == 200){
            this._toastr.success('Deleted successfully.', 'Successful', {
              timeOut: 3000,
            });
            this.historyStatement()
          }
          else if(res.msg == 403){
            this._toastr.warning('Document not found', 'Failed', {
              timeOut: 3000,
            });
          }
          else{
            this._toastr.warning('Something went wrong', 'Failed', {
              timeOut: 3000,
            });
          }
          console.log(res);
        }
        , err =>{
          if(err.status == "500"){
            this._toastr.error('Server error!', 'Failed', {
              timeOut: 3000,
            });
            console.log(err.message)
          }}
          );
        }
      }
      console.log(selectedProducts);
  }

}
