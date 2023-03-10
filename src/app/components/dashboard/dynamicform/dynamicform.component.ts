import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import * as Notiflix from 'notiflix';
import { home } from '../../model/dynamicForm.model';
declare let $: any;
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
  passData: any[]
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
  obj2 = {
    "addedby": (JSON.parse(this.myId)),
    "reg_code": this.randomString(25),
   };

  onsubmit(){
    let  passData:home[]= [...this.dataarray]
    passData.forEach((item)=>{
    item.reg_id= this.obj2.reg_code,
    item.customer_name =this.userForm.controls.customer_name.value
    item.customer_phone =this.userForm.controls.customer_phone.value
    item.customer_email =this.userForm.controls.customer_email.value
    item.customer_address =this.userForm.controls.customer_address.value
    item.addedby=this.obj2.addedby;
    item.order_total=item.order_qty*item.order_amt
    })
    this._auth.orderCreateAPI(passData).subscribe(res =>{
      console.log(res)
        // if(res.msg == '200')
        // {
        // }
        Notiflix.Notify.success('Record created successfully', {
          position: 'center-bottom',
          // success: {
          //     background: '#1EAAE7',
          //     },
          });
          //position: 'right-top',  'right-top' - 'right-bottom' - 'left-top' - 'left-bottom' - 'center-top' - 'center-bottom' - 'center-center'
       }, err =>{
           if(err.status == "400"){
            Notiflix.Report.failure('Failed', 'Student Registration Number Taken Already', 'Ok',
            {
              width: '300px',
              svgSize: '40px',
              backOverlayColor: '#000000',
            },);
            }
          else if(err.status == "403"){
            Notiflix.Report.failure('Failed', 'All Fields Are Required', 'Ok',
              {
                width: '300px',
                svgSize: '40px',
                backOverlayColor: '#000000',
              },);
          }
          else if(err.status == '503'){
            Notiflix.Notify.failure('Failed to register student', {
              });
          }
    });
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

validationMessage(msg){
  Notiflix.Report.failure('Failed', msg, 'ok',
  {
    width: '300px',
    svgSize: '60px',
    backOverlayColor: '#000000',
  },);
}

}
