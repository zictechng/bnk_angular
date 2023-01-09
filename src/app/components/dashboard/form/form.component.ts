import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{

  //userObj: userObj;
  userForm: FormGroup;

  constructor(private _router: Router){
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
  saveFormDetails(){
    const empDetails = this.userForm.value;
    console.log(empDetails);
  }
  ngOnInit(): void {

  }
}
