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
  id: any;
  selectedItems:any [];

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

  //delete record from history table
  deleteHistory(id: any){
    console.log(id);
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

}
