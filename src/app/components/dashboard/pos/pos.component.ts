import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as Notiflix from 'notiflix';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css']
})
export class PosComponent implements OnInit{

  productData: any[] = [];
  searchData: any[];
  cartProduct:any[] = [];
  sale_ref_code: any = {};
  ref_code:any = {};


  myId : any = localStorage.getItem('userData');
  @ViewChild('posForm') form: NgForm;
  products : any[] = [];
  constructor(private _auth: AuthService,
    private fb: FormBuilder,
      private _router: Router){

  }

  obj2 = {
    "user_createdBy": (JSON.parse(this.myId)),
    "reg_code": this.randomString(25),
   };
  ngOnInit(): void {

  }

// call search api here
  searchProduct(){
    const newSearchKey = Object.assign(this.form.value);
    //console.log(newSearchKey)
    this._auth.posProduct(newSearchKey).subscribe((res:any) =>{
    console.log(res)
    this.products = res;
     }, err =>{
      if(err.status == "500"){
       Notiflix.Notify.failure('Failed! Error occured, try again',
       {
         width: '300px',
         position: 'center-bottom',
      });

       }})
  }

  // save all the here
  saveOrder(){

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
