import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-ordercomfirm',
  templateUrl: './ordercomfirm.component.html',
  styleUrls: ['./ordercomfirm.component.css']
})
export class OrdercomfirmComponent {

  orderConfirmData:any = {}
  myId : any = localStorage.getItem('userData');

  constructor(private _auth: AuthService,
    private _router: Router){}


    ngOnInit(): void {

    }


    obj2 = {
      "tick_createdBy": (JSON.parse(this.myId)),
      "tick_tid": (this.randomString(25))
     };

     // send all form data to data here...
  submitConfirmOrder(){

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
