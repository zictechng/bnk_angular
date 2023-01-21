import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as Notiflix from 'notiflix';
declare let $: any;

interface student{
  email: String,
  name: String,
  phone: String,
  password: String,
  photo: String,
  student_class: String,
  sch_category: String,
  acct_pin: String,
  acct_status: String,
  acct_type: String,
  country: String,
  reg_number: String,
  dob: String,
  address: String,
  addedby: String,
  student_role: any,
  createdOn: any,
  term_name?:string,
  year_name?:string,
  g_total?:string,
  exam_score?:string,
  total_ca?:string,
  ca2?:string,
  ca1?:string,
  subject_name?:string,
}

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit{

  //create local variable name and pass it to the form submit method call #studentForm
  // (studentForm ) local variable name
  // we can still use viewChild variable method to pass the form details
  // @ViewChild('studentForm') form: NgForm   Like this
      studentData:student [] = [];
      ref_code: any = {};

      myId : any = localStorage.getItem('userData');
      @ViewChild('studentForm') form: NgForm;

      loading:Boolean = false;

      constructor(private _auth: AuthService,
      private _router: Router){

      }

      ngOnInit(): void {
        this.getStudentData();

      }

      // using local variable on ngForm with studentForm
      // (ngSubmit)="saveStudent(studentForm)" #studentForm="ngForm"  this will be on the form

      // using viewchild variable on ngForm with studentForm
      // (ngSubmit)="saveStudent()" #studentForm="ngForm"  this will be on the form
      // saveStudent1(form: NgForm){
      //   console.log(form);
      // }

      obj2 = {
        "tick_createdBy": (JSON.parse(this.myId)),
       };
       // merged all object and send to api backend


      // using viewchild method
      // save student data here
      saveStudent(){
        const newData = Object.assign(this.form.value, this.obj2);
        //console.log(newData);
        this._auth.registerNewStudent(newData).subscribe(res =>{
          //console.log(res);
          if(res.msg == '200')
          {
            Notiflix.Notify.success('Student Added Successfully', {
              // success: {
              //     background: '#1EAAE7',
              //     },
              });
              $('#myModal').modal('hide'); // close the modal here
             this._router.navigate(['/dashboard']); // redirect back home
          }
            else {
              Notiflix.Notify.failure('Sorry! Failed to register', {
                });
           }
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

      // save the dynamic form detials here
      saveDynamicFormDetails(form: NgForm){
console.log(this.studentData)
        const formData = Object.assign(form.value, this.obj2);
       // console.log('student data', formData);
        this._auth.dynamicTableData(this.studentData).subscribe(res =>{
          //console.log(res);
          if(res.msg == '200')
          {
            Notiflix.Notify.success('Record Added Successfully', {
              // success: {
              //     background: '#1EAAE7',
              //     },
              });
           // this._router.navigate(['/dashboard']); // redirect back home
          }
            else {
              Notiflix.Notify.failure('Sorry! Failed to save record',
                {
                });
           }
         }, err =>{
           if(err.status == "404"){
            Notiflix.Report.failure('Failed', 'Scores required', 'Ok',
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
            Notiflix.Notify.failure('Failed to save new record', {
              });
          }
        });
        console.log(form.value);
      }
      //
      // saveDynamicDetails(form: NgForm){
      //   //<form (ngSubmit)="saveDynamicFormDetails(dynamicForm)" #dynamicForm="ngForm"> : This can be on
      //   // the form UI for testing form details, help to get the form object details
      // }S

      // saveDynamicFormDetails(form: HTMLFormElement){
      //   //(ngSubmit)="saveDynamicFormDetails(dynamicForm)" #dynamicForm  : This can be on
      //   // the form UI for testing form details

      //   console.log(form);
      // }
      // fetch student details here..
      getStudentData(){
        this.loading = true;
        this._auth.fetchStudent().subscribe(res =>{
          this.studentData = res;
          this.ref_code = this.randomString(25);
          //console.log(res)
          this.loading = false
          })
      }
    //modal method here
    openModal(id:String){
      $('#'+id).modal('show');
    }
    closeModal(id: String){
    $('#' + id).modal('hide');
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
