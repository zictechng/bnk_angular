import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import * as Notiflix from 'notiflix';
import { startWith, map, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{
[x: string]: any;
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
    //this.userObj = new this.userObj()

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
          ca1: new FormControl("", Validators.required, this.maxInputValue),
          ca2: new FormControl("",  [Validators.required, this.maxInputValue]),
          ca3: new FormControl("",  Validators.required),
          ca_total: new FormControl(""),
        })
      ])
    });
    // this.userForm.get('fname').valueChanges.subscribe((value) =>{
    //   console.log(value);
    // })
    // this.userForm.controls['contact.ca1'].valueChanges.subscribe((value) =>{
    //   console.log(value);
    // })
    // this.userForm.valueChanges.subscribe((value) =>{
    //   console.log(value);
    // })
    this.userForm.statusChanges.subscribe((value) =>{
      console.log(value);
    })
  }


  obj2 = {
    "createdBy": (JSON.parse(this.myId)),
   };
// add total ca score
AddTotalScore(){
}

sum () {
  let { fname, lname, email, phone, contact } = this.userForm.value;
  this.total = this.ca1 + this.ca2
  //console.log(fname, lname, email, phone, contact);
  this.userForm.get('ca1').value
  console.log("Name: " + this['fname'])
  console.log("Name: " + this.userForm.get(lname).value)
}

  //send data to server to store
  saveFormDetails(){
    console.log(this.userForm.get('contact')['controls']);

    Notiflix.Loading.standard('Processing...');
    const empDetails = this.userForm.value;
    const obj2 = this.obj2;
    console.log(empDetails);
    this._auth.postFormData(empDetails).
    subscribe(res =>{
      console.log(res);
      if(res.msg == '200')
      {
        Notiflix.Loading.remove();
        //console.log('successful');

        // Notify.init({
        //   backOverlay: true,
        //   success: {
        //     background: 'red',
        //   }
        // });

        // Report.success('Sucessful', 'The operation was successful', 'ok',
        // {
        //   width: '360px',
        //   svgSize: '120px',
        // },

        // );
        Notify.success('Item Added', {
          success: {
              background: '#1EAAE7',
              },
          });
        // Notiflix.Notify.init({
        //   position: 'left-top',
        //   distance: '10px',
        //   opacity: 1,
        //   success: {
        //     background: '#1EAAE7',
        //   },
        //   // ...
        // });
        // Notiflix.Notify.success('Item Added', {
        //     width: '150px',
        //   });

        this._router.navigate(['/dashboard']);
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
  };

  // adding more dynamic input fields here
  addMoreFields(){
    const control = <FormArray>this.userForm.controls['contact'];
    control.push(
      new FormGroup({
        ca1: new FormControl('', Validators.required, this.maxInputValue),
        ca2: new FormControl('', Validators.required, this.maxInputValue),
        ca3: new FormControl('', Validators.required, this.maxInputValue),
        ca_total: new FormControl(""),
      })
    );
  }

  // removing dynamic inputs fields here
  removeMoreFields(index){
    const control = <FormArray>this.userForm.controls['contact'];
    control.removeAt(index);
  }

  // save the form details
  // saveFormDetails_1(){
  //   const empDetails = this.userForm.value;
  //   console.log(empDetails);
  // }



  ngOnInit(): void {
    this.createForm();
      }
  maxInputValue(control: FormControl){
    if(control.value != null && control.value > 5){
      //alert('Maximum value allowed is 5')
      Report.failure('Failed', 'Maximum value allowed is 5', 'ok',
        {
          width: '300px',
          svgSize: '60px',
          backOverlayColor: '#000000',
        },);
    }
    return null;
    }
  }

