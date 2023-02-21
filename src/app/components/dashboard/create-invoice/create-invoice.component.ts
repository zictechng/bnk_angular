import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import * as Notiflix from 'notiflix';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.css']
})
export class CreateInvoiceComponent implements OnInit{

  total: number;
  ca1: any;
  ca2: any;
  ca3: any;

  //userObj: userObj;
  public userForm: FormGroup;
  myId : any = localStorage.getItem('userData');

  constructor(private _router: Router,
    private _auth: AuthService,
    private _toastr: ToastrService,
    private formBuilder: FormBuilder,
    private fb: FormBuilder){

  }



   // get the value from the form here
   createForm(){
    this.userForm = new FormGroup({
      fname: new FormControl("", [Validators.required, Validators.minLength(10)]),
      email: new FormControl(""),
      phone: new FormControl(""),
      lname: new FormControl(""),
      created_by: new FormControl(JSON.parse(this.myId)),
      contact: new FormArray([
        new FormGroup({
          ca1: new FormControl("", Validators.required),
          ca2: new FormControl("",  Validators.required),
          ca3: new FormControl("",  Validators.required),
          ca_total: new FormControl(""),
        })
      ])
    });
  }
  obj2 = {
    "createdBy": (JSON.parse(this.myId)),
   };


   // send the dynamic data to db here...
  saveFormDetails(){
    Notiflix.Loading.standard('Processing...');
    const invoiceForm = this.userForm.value;
    this._auth.postInvoiceFormData(invoiceForm).
    subscribe(res =>{
      console.log(res);
      if(res.msg == '200')
      {
        Notiflix.Loading.remove();

        Notify.success('Invoice Create', {
          success: {
              background: '#1EAAE7',
              },
          });

      }
      else if(res.msg == '400'){
        Notiflix.Notify.warning('Error! Some fields missing..', {
          width: '150px',
        });
    Notiflix.Loading.remove();
      }
     }, err =>{
       if(err.status == "402"){
        this._toastr.error('User not found', 'Failed', {
          timeOut: 3000,
        });
        Notiflix.Loading.remove();
    }
    else if(err.status == "400"){
      Notiflix.Notify.warning('Error! Some fields missing..', {
            width: '150px',
          });
      Notiflix.Loading.remove();
      }
     }
    )
  }merged(merged: any) {
    throw new Error('Method not implemented.');

    //Notiflix.Loading.standard('Processing...');
  }
  // adding more dynamic input fields here
  addMoreFields(){
    const control = <FormArray>this.userForm.controls['contact'];
    control.push(
      new FormGroup({
        ca1: new FormControl('', Validators.required),
        ca2: new FormControl('', Validators.required),
        ca3: new FormControl('', Validators.required),
        ca_total: new FormControl(""),
      })
    );
  }

  // removing dynamic inputs fields here
  removeMoreFields(index){
    const control = <FormArray>this.userForm.controls['contact'];
    control.removeAt(index);
  }
  ngOnInit(): void {
    this.createForm();
  }
}
