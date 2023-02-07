import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import * as Notiflix from 'notiflix';
import { home } from '../../model/dynamicForm.model';

@Component({
  selector: 'app-dynamicform',
  templateUrl: './dynamicform.component.html',
  styleUrls: ['./dynamicform.component.css']
})
export class DynamicformComponent implements OnInit{

  public userForm = new FormGroup({
    customer_name: new FormControl(''),
    customer_address: new FormControl(''),
    customer_email:  new FormControl(''),
    customer_phone: new FormControl('')
  });
  ref_code:string
  home = new home(); // create new object of the class model that holds the variable
  dataarray: any=[]; // this will hold the data of the dynamic form fields

  myId : any = localStorage.getItem('userData');

  constructor(private _router: Router,
    private _auth: AuthService,
    private formBuilder: FormBuilder,
    private fb: FormBuilder){

  }

  ngOnInit(): void {

    this.home = new home(); // this will create the new object once the page is loaded

    this.dataarray.push(this.home) // then initialized the object on page load here

  }

  // dydnamically add more row input fields here when click
  addMoreForm(){
    this.home = new home();

    this.dataarray.push(this.home);
  }

  // dynamically remove input row
  removeFields(index: any){
    this.dataarray.splice(index);
  }
  // submit the form data here
  onsubmit(){
    let  passData:home[]= [...this.dataarray]
    passData.forEach((item)=>{
    item.reg_id= this.randomString(25),
    item.customer_name =this.userForm.controls.customer_name.value
    item.customer_phone =this.userForm.controls.customer_phone.value
    item.customer_email =this.userForm.controls.customer_email.value
    item.customer_address =this.userForm.controls.customer_address.value

  })
    this._auth.orderCreateAPI(passData)
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
