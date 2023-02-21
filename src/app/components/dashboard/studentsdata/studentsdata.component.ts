import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import * as Notiflix from 'notiflix';
declare let $: any;

@Component({
  selector: 'app-studentsdata',
  templateUrl: './studentsdata.component.html',
  styleUrls: ['./studentsdata.component.css']
})
export class StudentsdataComponent implements OnInit{


  loading:Boolean = false;
  studentData:any[] = [];
  ref_code: any = {};

  myId : any = localStorage.getItem('userData');

  constructor(private _auth: AuthService,
    private _router: Router){}


  ngOnInit(): void {
    this.getStudentData();
  }


  // fetch student details here..
  getStudentData(){
    this.loading = true;
    this._auth.fetchStudentData().subscribe(res =>{
      this.studentData = res;
      console.log("res is ",this.studentData)
     this.studentData.sort((a, b) => b.grand_total - a.grand_total);
    for (let i = 0; i < this.studentData.length; i++) {
      this.studentData[i].grand_total = i + 1;
      switch (this.studentData[i].grand_total) {
        case 1:
          this.studentData[i].rankSuffix = 'st';
          break;
        case 2:
          this.studentData[i].rankSuffix = 'nd';
          break;
        case 3:
          this.studentData[i].rankSuffix = 'rd';
          break;
        default:
          this.studentData[i].rankSuffix = 'th';
      }

    }
    //console.log("is ",this.studentData);
      this.ref_code = this.randomString(25);
      //,thiconsole.log(res)
      this.loading = false
      })
  }
  array:any = [];

  // save the final ranking details
  saveStudent(){
    // here we post the form complete details to backend
    console.log(this.studentData);
    this._auth.savePosition(this.studentData).subscribe(res =>{
      if(res.msg == '200')
          {
            Notiflix.Notify.success('Result Save Successfully', {
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
