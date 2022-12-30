import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-transfer-fund',
  templateUrl: './transfer-fund.component.html',
  styleUrls: ['./transfer-fund.component.css']
})
export class TransferFundComponent implements OnInit{

  recordId:any = '';
  myId : any = localStorage.getItem('userData');
  fundData:any = {};

constructor(private _auth : AuthService,
  private _router: Router,
  private _toastr: ToastrService){}

ngOnInit(): void {
//console.log('Transaction ID', this.randomString(25))
}

showSuccess() {
  this._toastr.success('Hello world!', 'Toastr fun!');
}

 obj2 = {
  "createdBy": (JSON.parse(this.myId)),
  "tid": (this.randomString(25)),
 };

 // merged all object and send to api backend
 merged = Object.assign(this.fundData, this.obj2);

// fund transfer method here
transferFund(){
  //console.log(this.myId)
  this._auth.transferFund(this.merged).
  subscribe(res =>{
    //console.log(res);
    if(res.msg == '200')
    {
      //console.log('successful');
      this._toastr.success('Fund transfer initiated', 'Successful', {
        timeOut: 3000,
      });
      localStorage.setItem('transaction_id', this.obj2.tid);
      this._router.navigate(['/pin']); // after transfer, go back to dashboard page
    }
    else if(res.msg == "402"){
        this._toastr.error('User not found', 'Failed', {
          timeOut: 3000,
        });
    }

  }, err =>{
     if(err.status == "402"){
      this._toastr.error('User not found', 'Failed', {
        timeOut: 3000,
      });

  } else if(err.status == "403"){
    this._toastr.error('User account not active, or account blocked!', 'Error occured!', {
      timeOut: 3000,
    });

  }
  else if(err.status == "405"){
    this._toastr.error('User account balance is low', 'Failed', {
      timeOut: 3000,
    });

  }})

};

// generate random string for transaction ID
randomString(length: Number) {
  var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var result = '';
  for ( var i = 0; i < length; i++ ) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }
  return result;
}
}

