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

  fundData:any = {}


constructor(private _auth : AuthService,
  private _router: Router,
  private _toastr: ToastrService){}

ngOnInit(): void {

}
showSuccess() {
  this._toastr.success('Hello world!', 'Toastr fun!');
}
// fund transfer method here
transferFund(){
  //console.log(this.registerUserData) // testing if data is coming
  this._auth.transferFund(this.fundData).
  subscribe(res =>{
    console.log(res);
    if(res.msg == '200')
    {
      console.log('successful');
      this._toastr.success('Fund transfer was successful', 'Successful', {
        timeOut: 3000,
      });
    }
   this._router.navigate(['/dashboard']); // after transfer, go back to dashboard page
  })
};


}
