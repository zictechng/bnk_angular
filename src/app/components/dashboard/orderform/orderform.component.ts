import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-orderform',
  templateUrl: './orderform.component.html',
  styleUrls: ['./orderform.component.css']
})
export class OrderformComponent implements OnInit {

  orderData:any = {}
  myId : any = localStorage.getItem('userData');
  public userForm!:FormGroup;

  selectedTeam = '';

  constructor(private _auth: AuthService,
    private fb: FormBuilder,
    private _route: Router,
    private _toastr: ToastrService){
      this.userForm = this.fb.group({
        shipp_type: new FormControl("", Validators.required),
        shipp_address: new FormControl("", Validators.required),
        shipp_sender_email: new FormControl("", Validators.required),
        shipp_sender_name:new FormControl("", Validators.required),
        contact: new FormArray([
          new FormGroup({
            ca1: new FormControl("", [Validators.required, Validators.minLength(2)]),
            ca2: new FormControl("",  Validators.required),
            ca3: new FormControl("",  Validators.required),
            ca_total: new FormControl(""),
          })
        ])

       })
    }
    onSelected(value:string): void {
		this.selectedTeam = value;
    //console.log(this.selectedTeam)
	}

    ngOnInit(): void {

    }
    obj2 = {
      "tick_createdBy": (JSON.parse(this.myId)),
      "tick_tid": (this.randomString(25))
     };

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

     // merged all object and send to api backend
    //merged = Object.assign(this.ticketData, this.obj2);

    // get the details fill in the form and send to next page here for confirmation
    submitOrder(){
      const orderData = this.userForm.value
      //console.log(orderData)
      this._auth.orderDataPassed(orderData);
      this._route.navigate(['/order-confirm']);
     }

     //send dynamic data to api here...
     dynamicDataSend(){
      const formData = this.userForm.value
      console.log(formData)
      // this._auth.sendDynamicData(formData).subscribe(res =>{
      //   console.log(res);
      // })
     }


     // select 2 goes here...
     cars = [
      { id: 1, name: "BMW Hyundai" },
      { id: 2, name: "Kia Tata" },
      { id: 3, name: "Volkswagen Ford" },
      { id: 4, name: "Renault Audi" },
      { id: 5, name: "Mercedes Benz Skoda" },
    ];

    selected = [{ id: 3, name: "Volkswagen Ford" }];

    // generate random string for transaction ID
        randomString(length: Number) {
        var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var result = '';
        for ( var i = 0; i < length; i++ ) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return result;
        }


  // this._auth.supportTicket(this.merged).subscribe(res =>{
      //   //console.log(res);
      //   if(res.msg == '200')
      //   {
      //     //console.log('successful');
      //     this._toastr.success('Ticket created successfully', 'Successful', {
      //       timeOut: 3000,
      //     });
      //     this._router.navigate(['/dashboard']); // after pin validated, go to next page
      //   }
      //     else {
      //       this._toastr.info('Something went wrong! Try again', 'Sorry', {
      //         timeOut: 3000,
      //       });
      //     }
      //  }, err =>{
      //    if(err.status == "402"){
      //     this._toastr.error('User not found', 'Failed', {
      //       timeOut: 3000,
      //     });

      // }
      // else if(err.status == "404"){
      //   this._toastr.warning('All fields are required !', 'Required', {
      //     timeOut: 3000,
      //   });
      // }
      // }
      // )

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
