import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-orderform',
  templateUrl: './orderform.component.html',
  styleUrls: ['./orderform.component.css']
})
export class OrderformComponent implements OnInit {

  ticketData:any = {}
  myId : any = localStorage.getItem('userData');

  constructor(private _auth: AuthService,
    private _router: Router,
    private _toastr: ToastrService){}

    ngOnInit(): void {

    }
    obj2 = {
      "tick_createdBy": (JSON.parse(this.myId)),
      "tick_tid": (this.randomString(25))
     };

     // merged all object and send to api backend
    merged = Object.assign(this.ticketData, this.obj2);

    // get the details fill in the form and send to next page here for confirmation
    submitOrder(){

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


  // this._auth.supportTicket(this.merged).subscribe(res =>{
      //   //console.log(res);
      //   if(res.msg == '200')
      //   {
      //     //console.log('successful');
      //     this._toastr.success('Ticket created successfully', 'Successful', {
      //       timeOut: 3000,
      //     });
      //     this._router.navigate(['/dashboard']); // after pin validated, go to next page
      //   }
      //     else {
      //       this._toastr.info('Something went wrong! Try again', 'Sorry', {
      //         timeOut: 3000,
      //       });
      //     }
      //  }, err =>{
      //    if(err.status == "402"){
      //     this._toastr.error('User not found', 'Failed', {
      //       timeOut: 3000,
      //     });

      // }
      // else if(err.status == "404"){
      //   this._toastr.warning('All fields are required !', 'Required', {
      //     timeOut: 3000,
      //   });
      // }
      // }
      // )
}
