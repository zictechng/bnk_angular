import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-ordercomfirm',
  templateUrl: './ordercomfirm.component.html',
  styleUrls: ['./ordercomfirm.component.css']
})
export class OrdercomfirmComponent {

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
      // get the data passed from order page here
      const orderInfo = this._auth.getDataStream();
      orderInfo.subscribe({
        next:(data: any) =>{
          this.orderConfirmData = data;
          //console.log(this.orderConfirmData);
        },
        error:(err: any) =>{
          console.log(err);
        }
      })
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
