import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as Notiflix from 'notiflix';
import { Notify } from 'notiflix';
import { debounceTime, Subject } from 'rxjs';
import { AuthService, Product } from 'src/app/services/auth.service';


interface orderList{
  product_name?: String,
  product_description?: String,
  product_sale_price?: Number,
  product_qty?: Number,
  product_total_amt?: Number,
  product_all_total_amt?: Number,
  product_id?: String,
  reg_code?: String,
  product_order_id?: String,
  addedby: String,
}

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css']
})
export class PosComponent implements OnInit{

  passData: any[]
  productData: any[] = [];
  searchData: any[];
  cartProduct:any[] = [];
  sale_ref_code: any = {};
  ref_code:any = {};
  orderData: orderList[]=[]
  public searchInput: String = '';

 public searchResult: Array<any> = [];
 public toggle: Boolean = false;
 public selectedInput: any = {};
 private value = '';

 // search product interface model call here
 product:any[] = [];
 hasQuery:Boolean = false;
 itemOrderID: string = '';
 orderRefCode: any = '';
 orderInvoiceID: any ='';

  myId : any = localStorage.getItem('userData');
  userDa = (JSON.parse(localStorage.getItem('userData')));
  obj2 = ''+this.userDa._id // get the current logged user ID
  obj3 = ''+this.randomString(25);


  @ViewChild('posForm') form: NgForm;

  searchProducts:any ='';
  searchName: string = '';
  keyUpSubject = new Subject<any>();
  data: any;
  gTotal = 0
  constructor(private _auth: AuthService,
    private fb: FormBuilder,
      private _router: Router){

  }

   public selectedValue: any;
   public searchValue: any;
   public filteredList: any = [];
   multipleImages: any [] = [];
   dropZoneImages: any [] = [];
   uploadSuccess: boolean;
   upload_btn:boolean = false;

   ngOnInit() {
    this.generateOrderID();
    this. generateOrderRecordID();
    this.generateOrderSaleRef();

   }
   files: File[] = [];
   imageBASE64: any = '';

      onSelect(event) {
       console.log(event);
        this.files.push(...event.addedFiles);
        let fileType = event.addedFiles[0].type;
        let fileSize = event.addedFiles[0].size;
        let sizeOfFile = Math.round(fileSize / 1024);

        if (sizeOfFile > 5*1024) {
          Notiflix.Notify.failure('Sorry, file to large to upload',
          {
          width: '300px',
          position: 'center-bottom',
        });

        this.clearImage();
        return;
        }
        console.log("File selected ", this.files);
        console.log("File Size: ", fileSize)
        console.log("File Type: ", fileType)
        if(this.files.length > 0){
          this.dropZoneImages = this.files;
          this.upload_btn = true;
        }
        // this.readFile(this.files[0]).then(fileContents => {
        //   // Put this string in a request body to upload it to an API.
        //console.log("Data send to api ", this.dropZoneImages);
        //  this.imageBASE64 = fileContents;
        // })
      }

      onRemove(event) {
        console.log(event);
        this.files.splice(this.files.indexOf(event), 1);
      }

      // this will make the selected image to be converted to base64
      // private async readFile(files: File): Promise<string | ArrayBuffer> {
      //   return new Promise<string | ArrayBuffer>((resolve, reject) => {
      //     const reader = new FileReader();

      //     reader.onload = e => {
      //       return resolve((e.target as FileReader).result);
      //     };

      //     reader.onerror = e => {
      //       console.error(`FileReader failed on file ${files.name}.`);
      //       return reject(null);
      //     };

      //     if (!files) {
      //       console.error('No file to read.');
      //       return reject(null);
      //     }

      //     reader.readAsDataURL(files);
      //   });
      // }

      onFilesRejected(event) {
        console.log(event);
      }
      //reset the file upload form here
      clearImage(){
        if(this.uploadSuccess == true){
          this.files.splice(0);
        }
      }

      // upload mutiple dropZone images action goes here---
      uploadAllImages(){
        const formData = new FormData();
        if(this.dropZoneImages.length < 1){
         Notiflix.Notify.failure('Please choose a file',
          {
          fontSize:'20px',
          width: '300px',
          position: 'center-bottom',
          showOnlyTheLastOne: true,
        });
        return;
        }
        // this use confirm box to ask before sending request to api
        Notiflix.Confirm.show(
          'Confirm',
          'Are you sure you want to upload?',
          'Yes',
          'Cancel',
          () => {
          //alert('Thank you.'); yes operation goes here
          for(let img of this.dropZoneImages){
            formData.append('files', img)
            console.log(img);
          }
          formData.append('user_id', this.obj2);
          formData.append("reg_code", this.obj3);
          this._auth.uploadProductThumbImage(formData).subscribe(res =>{
            console.log(res);
            if(res.msg == '200'){
              Notiflix.Notify.success('Successful! Images uploaded successfully',
                {
                fontSize:'20px',
                width: '450px',
                position: 'center-bottom',
                showOnlyTheLastOne: true,
              });

             this.uploadSuccess = true;
             this.clearImage();

            } else if(res.msg == '400'){
              Notiflix.Notify.warning('Error! Images not uploaded.',
                {
                fontSize:'20px',
                width: '300px',
                position: 'center-bottom',
                showOnlyTheLastOne: true,
              });
            } else if(res.msg == '402'){
              Notiflix.Notify.warning('Access denied! Login to upload images.',
                {
                fontSize:'20px',
                width: '350px',
                position: 'center-bottom',
                showOnlyTheLastOne: true,
              });
            }
            else if(res.msg == '404'){
              Notiflix.Notify.failure('Failed! Files not selected.',
                {
                fontSize:'20px',
                width: '350px',
                position: 'center-bottom',
                showOnlyTheLastOne: true,
              });
            }
            else {
              Notiflix.Notify.warning('Failed! Try upload again',
              {
                width: '300px',
                position: 'center-bottom',
                showOnlyTheLastOne: true,
              });
            }
          }, err =>{
            if(err.status == "500"){
            Notiflix.Notify.failure('Failed! Error occured, try again',
            {
              fontSize:'20px',
              width: '350px',
              position: 'center-bottom',
              showOnlyTheLastOne: true,
            });

            }
            else if(err.status == "404"){
              Notiflix.Notify.failure('Failed! no file selected, try again',
              {
                fontSize:'20px',
                width: '350px',
                position: 'center-bottom',
                showOnlyTheLastOne: true,
              });

              }
          })
          },
          //alert(Cancell operation here');
          () => {
          //alert('If you say so...'); no operation goes here
          Notiflix.Notify.info('Request cancelled!',
              {
                fontSize:'20px',
                width: '300px',
                position: 'center-bottom',
                showOnlyTheLastOne: true,
              });
              },
            {
          },
        ); }

    //multiple files selected here
    selectMultipleImage(event){
      if(event.target.files.length > 0){
        this.multipleImages = event.target.files
      }
    }

    updateGrandTotal() {
      this.gTotal = this.searchProducts.reduce((total, item) => {
        return total + (item.product_sale_price * item.product_qty);
      }, 0);
    }

    calculateValue(item:any){
      if(item.product_sale_price && item.product_qty){
        //console.log(item.product_sale_price* (+item.product_qty))
        this.updateGrandTotal();
        return Number(item.product_sale_price * item.product_qty);
      }
        else{
          this.updateGrandTotal();
      return item.product_sale_price * item.product_qty;
        }
    }

  // Normal multiple image upload here
    submitMultipleImage(){
      const formData = new FormData();
      for(let img of this.multipleImages){
        formData.append('files', img)
      }
      this._auth.uploadMultipleFiles(formData).subscribe(res =>{
        console.log(res);
        if(res.msg == '200'){
          Notiflix.Notify.success('Successful! Images uploaded successfully',
            {
              fontSize:'20px',
              cssAnimationStyle:'from-bottom',
              width: '400px',
              position: 'center-bottom',
              showOnlyTheLastOne: true,
          });
        }
        else {
          Notiflix.Notify.warning('Failed! Try upload again',
          {
              cssAnimationStyle:'from-bottom',
              fontSize:'20px',
              width: '350px',
              position: 'center-bottom',
              showOnlyTheLastOne: true,
          });
        }
      }, err =>{
        if(err.status == "500"){
        Notiflix.Notify.failure('Failed! Error occured, try again',
        {
          position:'center-bottom',
          width: '300px',
         cssAnimationStyle:'from-bottom',
         fontSize:'20px',
          showOnlyTheLastOne: true,
        });

        }})
    }

   // auto complete search request that recieve the input value here
   sendData(event:any){
    // console.log(event.target.value);
    let query:string = event.target.value;
    // remove space in the type words
    this.searchDataFn(query)
   }

   // searching that show the dropdown list and remove space in the type words
   searchDataFn(query){
    let matchSpaces:any = query.match(/\s*/);
    if(matchSpaces[0] === query){
      this.product = [];
      this.hasQuery = false;
      return
    }
    this._auth.searchPosProduct(query.trim()).subscribe(results =>{
      this.hasQuery = true;
      this.product = results;
      console.log(results)
    });
   }

    showDetails(series) {
       this.selectedInput = series;
       this.toggle = true;
       this.searchInput = series.name;
      }

      // get auto generate order ID here
      generateOrderID(){
        this.itemOrderID = this.randomOrderId(12)
      }
      // get auto generate order invoice ID here
      generateOrderRecordID(){
        this.orderInvoiceID = this.randomOrderId(12)
      }
      // get auto generate order sale ref ID here
      generateOrderSaleRef(){
        this.orderRefCode = this.randomString(25)
      }

    //   const value = event.target.value;
    //   this.searchName = value;
    //   this.keyUpSubject.next(value);
    //   const newSearchKey = Object.assign(this.form.value);
    //   console.log(newSearchKey)
    //   this._auth.posProduct(newSearchKey).subscribe((res:any) =>{
    //   //console.log(res)
    // }, err =>{
    //  if(err.status == "500"){
    //   Notiflix.Notify.failure('Failed! Error occured, try again',
    //   {
    //     width: '300px',
    //     position: 'center-bottom',
    //  });

    //   }})
    //   }

    // when product name is click from the dropdown search list
    searchKey = '' // this will bind the input to recieve the selected value
    selectFromSearch(data:any){
    this.searchKey = data.product_name;
    this.hasQuery = false
    // this.searchDataFn(this.searchKey);
    this.product = [] // this set the array to empty so that the dropdown list can go off
    this.searchProduct(data._id); // here receive the value and send to a function
    //console.log(data)
    }

// get product ID from search input unchange here and send it to api to fetch details
    searchProduct(id:string){
    console.log(this.searchKey)
    const newSearchKey = Object.assign({
      search_name:id,
      'user_id': this.userDa._id,
      'order_id':this.itemOrderID
    });
    //console.log(newSearchKey)
    this.searchKey=''; // this will clear off the search input filed after clicking on the list item
    this._auth.posProduct(newSearchKey).subscribe((res:any) =>{
    //console.log(res)
    this.searchProducts = res;
    this.orderData = res;
    }, err =>{
      if(err.status == "500"){
       Notiflix.Notify.failure('Failed! Error occured, try again',
       {
         width: '300px',
         position: 'center-bottom',
      });

       }})
  }

  param = {
    "addedby": (JSON.parse(this.myId)),
    // "reg_code": this.randomString(25),
    // "order_id":this.randomOrderId(12)
   };

  processOrderDetails(val: any){
    //console.log("Old data", this.searchProducts)
    //const orderData = Object.assign({"TotalValue":this.gTotal}, this.orderData);
    //console.log("Data send to API: ", orderDataDetails, "Total Amt: ", this.gTotal);
    this.orderData = this.orderData.map((m)=>{
      return {
        ...m,
        product_all_total_amt:this.gTotal,
        reg_code: this.orderRefCode,
        product_order_id:this.orderInvoiceID
      }
    });
    this._auth.saveOrderDetails(this.orderData).subscribe(res =>{
      console.log("Data send to API: ", this.orderData);
        console.log("API Result: ", res);
        if(res.msg == '200')
          {
            Notiflix.Notify.success('Order processed Successfully', {
              cssAnimationStyle:'from-bottom',
              fontSize:'20px',
              position:'center-bottom',
              width: '350px',
              showOnlyTheLastOne: true,
             });
          }
            else {
              Notiflix.Notify.failure('Sorry! Failed to process order', {
                position:'center-bottom',
                width: '300px',
                fontSize:'20px',
                showOnlyTheLastOne: true,
                });
           }
         }, err =>{
           if(err.status == "400"){
            Notiflix.Notify.failure('Failed! Product ID number already exist',
            {
              fontSize:'20px',
              width: '300px',
              position: 'center-bottom',
              showOnlyTheLastOne: true,
           });
            }
          else if(err.status == "403"){
            Notiflix.Notify.failure('Failed! Some required fields are missing',
            {
              fontSize:'20px',
              width: '350px',
              position: 'center-bottom',
              showOnlyTheLastOne: true,
           });
          }
          else if(err.status == '503'){
            Notiflix.Notify.failure('Failed to register new product', {
              fontSize:'20px',
              width: '350px',
              position: 'center-bottom',
              showOnlyTheLastOne: true,
              });
          }
        });
       //console.warn("Form details", this.orderData);
       this.gTotal = 0
       this.searchProducts = [];
       this.orderData = [];
       this.generateOrderID();
       this.generateOrderRecordID()
       this.generateOrderSaleRef()
       this.form.resetForm();
  }
  // remove order from pre order (cart) list
  deleteOrder(id:any){
    Notiflix.Confirm.show(
      'Please confirm',
      'Are you sure you want to remove order?',
      'Yes',
      'No',
      () => {
        this._auth.deleteOrderList(id).subscribe(res =>{
          if(res.msg == 200){
            Notiflix.Notify.success('Order removed from cart', {
              cssAnimationStyle:'from-bottom',
              fontSize:'20px',
              width: '350px',
              position: 'center-bottom',
              showOnlyTheLastOne: true,
             });
             this.searchProduct(id)
          }
          else if(res.msg == 403){
            Notiflix.Notify.failure('No found!, try again', {
              fontSize:'20px',
              width: '350px',
              position: 'center-bottom',
              showOnlyTheLastOne: true,
             });
          }
          else{
            Notiflix.Notify.warning('Sorry! Something went wrong', {
              fontSize:'20px',
              width: '350px',
              position: 'center-bottom',
              showOnlyTheLastOne: true,
             });
          }

        }, err =>{
        if(err.status == "500"){
          Notiflix.Notify.failure('Sorry! Technical problem occured', {
            cssAnimationStyle:'from-bottom',
            fontSize:'20px',
            width: '350px',
            position: 'center-bottom',
            showOnlyTheLastOne: true,
           });
          console.log(err.message)
        }}
        );
      },
      () => {
        // No don't remove the order and the operation stop
        //alert('If you say so...');
      },);

    this.searchProducts
  }
  // save detail when enter key is press here
      enterKeySave(){
        this.updateGrandTotal();
        console.log("Enter key button is press: ", this.searchKey)
      }
      // save the details when save button is click
      // saveButtonClick(){
      //   console.log("Add button is click: ", this.searchKey)
      // }

      // this is for testing notification attribute
      checkOutP(){
        Notify.success('Great! Thank you for clicking.',
                {
                //cssAnimationStyle:'zoom',
                cssAnimationStyle:'from-bottom',
                fontSize:'20px',
                width: '300px',
                position: 'center-bottom',
                //position: 'right-top',
                showOnlyTheLastOne: true,
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

      // generate random string for transaction ID
      randomOrderId(length: Number) {
        var randomChars = '0123456789';
        var result = '';
        for ( var i = 0; i < length; i++ ) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return result;
      }
}
