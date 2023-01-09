import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{

  //userObj: userObj;
  userForm: FormGroup;


  constructor(private _router: Router,
    private _auth: AuthService,
    private _toastr: ToastrService){
    //this.userObj = new this.userObj()
    this.createForm();
  }

  createForm(){
    this.userForm = new FormGroup({
      fname: new FormControl("", [Validators.required, Validators.minLength(10)]),
      email: new FormControl(""),
      phone: new FormControl(""),
      lname: new FormControl(""),
      contact: new FormArray([
        new FormGroup({
          ca1: new FormControl(""),
          ca2: new FormControl(""),
          ca3: new FormControl(""),
        })
      ])
    });
  }


  // adding more dynamic input fields here
  addMoreFields(){
    const control = <FormArray>this.userForm.controls['contact'];
    control.push(
      new FormGroup({
        ca1: new FormControl(''),
        ca2: new FormControl(''),
        ca3: new FormControl(''),
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
  saveFormDetails(){
    const empDetails = this.userForm.value;
    console.log(empDetails);
    this._auth.postFormData(empDetails).
    subscribe(res =>{
      //console.log(res);
      if(res.msg == '200')
      {
        //console.log('successful');
        this._toastr.success('Save', 'successful', {
          timeOut: 3000,
        });
        this._router.navigate(['/dashbaord']); // after pin validated, go to next page
      }
     }, err =>{
       if(err.status == "402"){
        this._toastr.error('User not found', 'Failed', {
          timeOut: 3000,
        });

    }

    }
    )
  }merged(merged: any) {
    throw new Error('Method not implemented.');
  };


  ngOnInit(): void {

  }
}
