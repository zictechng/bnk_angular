
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
          ca1: new FormControl("", [Validators.required, Validators.minLength(2)]),
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
    console.log(invoiceForm);
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
              showOnlyTheLastOne: true,
          });

      }
      else if(res.msg == '400'){
        Notiflix.Loading.remove();
        Notiflix.Notify.warning('Error! Some fields missing..', {
          width: '150px',
          showOnlyTheLastOne: true,
        });
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
            showOnlyTheLastOne: true,
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
    this.updateValueSub(control.length-1);
  }

  // removing dynamic inputs fields here
  removeMoreFields(index){
    const control = <FormArray>this.userForm.controls['contact'];
    control.removeAt(index);
  }
  ngOnInit(): void {
    this.createForm();
    this.updateValueSub(0);

  // const length = this..get('length');
  // const width = this.basketForm.get('width');
  // length.valueChanges.subscribe(val => {
  //   width.setValue(val * 2);
  // });


  }

  // auto add the value of the input here
  updateValueSub(i:number){
    const control = <FormArray>this.userForm.controls['contact'];

    function updateValue(){
     control.at(i).get('ca_total').setValue(
       +control.at(i).get('ca1').value + +control.at(i).get('ca2').value +  +control.at(i).get('ca3').value
       )
     }
     control.at(i).get('ca1').valueChanges.subscribe(val=>{
       updateValue();
     })
     control.at(i).get('ca2').valueChanges.subscribe(val=>{
       updateValue();
     })
     control.at(i).get('ca3').valueChanges.subscribe(val=>{
       updateValue();
     })
  }

}
