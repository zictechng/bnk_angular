import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-orderform',
  templateUrl: './orderform.component.html',
  styleUrls: ['./orderform.component.css']
})
export class OrderformComponent implements OnInit, OnDestroy{

  orderData:any = {}
  myId : any = localStorage.getItem('userData');
  public userForm!:FormGroup;
  public imageForm1!:FormGroup;
  cars:any=[]
  orderTextInput: any = {};
  formDetail:any = {};


  selectedTeam = '';
  files: File[] = [];
      onSelect(event) {
        console.log(event);
        this.files.push(...event.addedFiles);
      }

      onRemove(event) {
        console.log(event);
        this.files.splice(this.files.indexOf(event), 1);
      }


  constructor(private _auth: AuthService,
    private fb: FormBuilder,
    private _route: Router,
    private _toastr: ToastrService){
      this.cars = [
        { id: 1, name: "BMW Hyundai" },
        { id: 2, name: "Kia Tata" },
        { id: 3, name: "Volkswagen Ford" },
        { id: 4, name: "Renault Audi" },
        { id: 5, name: "Mercedes Benz Skoda" },
      ];

      // image upload form 1 input details here
        this.imageForm1 = this.fb.group({
        image_address: new FormControl("", Validators.required),
        image_email: new FormControl("", Validators.required),
        image_name:new FormControl("", Validators.required),
       });
    }
      onSelected(value:string): void {
		  this.selectedTeam = value;
    //console.log(this.selectedTeam)
	    }
      createForm(){
      this.userForm = this.fb.group({
        shipp_type: new FormControl("", Validators.required),
        shipp_sender_email: new FormControl("", Validators.required),
        shipp_sender_name:new FormControl("", Validators.required),
        created_by: new FormControl(JSON.parse(this.myId)),
        tick_tid: new FormControl(this.randomString(25)),
        title_name: [],
        contact: new FormArray([
          new FormGroup({
            comp_name: new FormControl("", [Validators.required, Validators.minLength(2)]),
            comp_phone: new FormControl("",  Validators.required),
            comp_address: new FormControl("",  Validators.required),

          })
        ]),
      })
      }

      // test the image upload form details here
    checkFormUpload(){
      console.log("Image upload 1 details: ", this.imageForm1.value);
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
        comp_name: new FormControl('', Validators.required),
        comp_phone: new FormControl('', Validators.required),
        comp_address: new FormControl('', Validators.required),

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
      const orderData = this.orderTextInput
      sessionStorage.setItem('order_info',JSON.stringify(orderData));
      this.formDetail = JSON.parse(sessionStorage.getItem('order_info'));
      //this._auth.orderDataPassed(orderData);
      this._route.navigate(['/order-confirm']);
     }

     //send dynamic data to api here...
     dynamicDataSend(){
      const formData = (this.userForm.value)
      console.log(this.userForm.value)
      this._auth.sendDynamicData(formData).subscribe(res =>{
        console.log(res);
      })
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

        ngOnInit(): void {
          // get the value from the form here
           this.createForm();
           this.updateValueSub(0);
         }

          ngOnDestroy(): void {
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
