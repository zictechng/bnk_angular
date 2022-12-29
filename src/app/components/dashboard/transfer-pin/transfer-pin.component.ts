import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-transfer-pin',
  templateUrl: './transfer-pin.component.html',
  styleUrls: ['./transfer-pin.component.css']
})
export class TransferPinComponent implements OnInit {


  pinData:any = {}
  myId : any = localStorage.getItem('userData');
  record_tid = localStorage.getItem('transaction_id');
  acct_pin: String = this.pinData;

  constructor(private _auth: AuthService,
    private _router: Router,
    private _toastr: ToastrService){}

  ngOnInit(): void {
    console.log(this.record_tid);
  }
  obj2 = {
    "createdBy": (JSON.parse(this.myId)),
    "tran_id": this.record_tid
   };
   // merged all object and send to api backend
 merged = Object.assign(this.pinData, this.obj2);

  // fund transfer pin method here
transferPin(){
  //console.log(this.myId)
  this._auth.transferPin(this.merged).
  subscribe(res =>{
    //console.log(res);
    if(res.msg == '200')
    {
      //console.log('successful');
      this._toastr.success('Transfer Pin validated successfull', 'Pin Validated', {
        timeOut: 3000,
      });
      this._router.navigate(['/cot']); // after pin validated, go to next page
    }
   }, err =>{
     if(err.status == "402"){
      this._toastr.error('User not found', 'Failed', {
        timeOut: 3000,
      });

  } else if(err.status == "404"){
    this._toastr.warning('Pin code required!', 'Required', {
      timeOut: 3000,
    });
  }
  else if(err.status == "403"){
    this._toastr.warning('User account not active, or account blocked!', 'Error occured!', {
      timeOut: 3000,
    });

  }
  else if(err.status == "204"){
    this._toastr.warning('Account pin not activated', 'Failed', {
      timeOut: 3000,
    });
    }
    else if(err.status == "406"){
      this._toastr.error('Invalid pin entered!', 'Failed', {
        timeOut: 3000,
      });
      }
  }
  )
};

}
