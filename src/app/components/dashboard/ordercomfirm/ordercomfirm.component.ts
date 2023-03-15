import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-ordercomfirm',
  templateUrl: './ordercomfirm.component.html',
  styleUrls: ['./ordercomfirm.component.css']
})
export class OrdercomfirmComponent implements OnInit, OnDestroy{

  public orderConfirmForm:FormGroup;
  orderConfirmData:any = {}

  myId : any = localStorage.getItem('userData');



  constructor(private _auth: AuthService,
     private fb: FormBuilder,
    private _router: Router){
      this.orderConfirmForm = this.fb.group({
        shipp_type: new FormControl("", Validators.required),
        shipp_address: new FormControl("", Validators.required),
        shipp_sender_email: new FormControl("", Validators.required),
        shipp_sender_name:new FormControl("", Validators.required),
       });
    }

    ngOnInit(): void {

      // get data from order page via sessionStorage here..
      this.orderConfirmData = JSON.parse(sessionStorage.getItem('order_info'));
      if(this.orderConfirmData == null){
        this._router.navigate(['/order-form']);
      }
      //console.log("This is order confirm Page: ", this.orderConfirmData)

      // get the data passed from order page via serviceprovider here
      //let orderInfo = this._auth.getDataStream();
      //this.orderConfirmData = (orderInfo);
      // orderInfo.subscribe({
      //   next:(data: any) =>{
      //     this.orderConfirmData = data;
      //     console.log("This is confirm page data ", this.orderConfirmData);
      //   },
      //   error:(err: any) =>{
      //     console.log(err);
      //   }
      // })
    }

    // clear all store details in session here
      ngOnDestroy() {
        sessionStorage.clear();
      }


    obj2 = {
      "tick_createdBy": (JSON.parse(this.myId)),
      "tick_tid": (this.randomString(25))
     };

     // send all form data to data here...
  submitConfirmOrder(){
    console.log( 'Here is the details ', this.orderConfirmForm)
  }


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
