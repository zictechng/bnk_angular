import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-transfer-imf',
  templateUrl: './transfer-imf.component.html',
  styleUrls: ['./transfer-imf.component.css']
})
export class TransferImfComponent implements OnInit {

  imfData:any = {}
  myId : any = localStorage.getItem('userData');
  record_tid = localStorage.getItem('transaction_id');

  constructor(private _auth: AuthService,
    private _router: Router,
    private _toastr: ToastrService){}

  ngOnInit(): void {

  }

  obj2 = {
    "createdBy": (JSON.parse(this.myId)),
    "tran_id": this.record_tid
   };
    // merged all object and send to api backend
 merged = Object.assign(this.imfData, this.obj2);

// confirm IMF method here
 imfConfirm(){
  this._auth.imfConfirm(this.merged).subscribe(res =>{
    //console.log(res);
    if(res.msg == '200')
    {
      //console.log('successful');
      this._toastr.success('Transfer completed successfully', 'Successful', {
        timeOut: 3000,
      });
      this._router.navigate(['/successful']); // after pin validated, go to next page
    }
      else {
        this._toastr.info('Something went wrong! Try again', 'Sorry', {
          timeOut: 3000,
        });
      }
   }, err =>{
     if(err.status == "402"){
      this._toastr.error('User not found', 'Failed', {
        timeOut: 3000,
      });

  } else if(err.status == "403"){
    this._toastr.warning('User account not active, or account blocked!', 'Error occured!', {
      timeOut: 3000,
    });

  }
  else if(err.status == "404"){
    this._toastr.warning('IMF code field required !', 'Required', {
      timeOut: 3000,
    });
  }
  else if(err.status == "401"){
    this._toastr.warning('Account IMF code not activated', 'Failed', {
      timeOut: 3000,
    });
    }
    else if(err.status == "406"){
      this._toastr.error('Invalid IMF code entered!', 'Failed', {
        timeOut: 3000,
      });
      }
  }
  )}
}
