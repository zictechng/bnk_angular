import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as Notiflix from 'notiflix';
import { Notify } from 'notiflix';
import { debounceTime, Subject } from 'rxjs';
import { AuthService, Product } from 'src/app/services/auth.service';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css']
})
export class PosComponent implements OnInit{

  productData: any[] = [];
  searchData: any[];
  cartProduct:any[] = [];
  sale_ref_code: any = {};
  ref_code:any = {};
  public searchInput: String = '';

 public searchResult: Array<any> = [];
 public toggle: Boolean = false;
 public selectedInput: any = {};
 public totalAmt = 0;
 public totalAll;
 private value = '';

 // search product interface model call here
 product:any[] = [];
 hasQuery:Boolean = false;
 itemOrderID: string = '';

  myId : any = localStorage.getItem('userData');
  userDa = (JSON.parse(localStorage.getItem('userData')));
  obj2 = ''+this.userDa._id // get the current logged user ID
  obj3 = ''+this.randomString(25);


  @ViewChild('posForm') form: NgForm;
  searchProducts: any;
  searchName: string = '';
  keyUpSubject = new Subject<any>();
  data: any;
  currencyPipe: any;
  subTotalItems: any;
  cartService: any;
  gTotal:any
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
      // upload image action goes here---
      uploadAllImages(){
        const formData = new FormData();
        if(this.dropZoneImages.length < 1){
         Notiflix.Notify.failure('Please choose a file',
          {
          fontSize:'20',
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
                width: '300px',
                position: 'center-bottom',
                showOnlyTheLastOne: true,
              });

             this.uploadSuccess = true;
             this.clearImage();

            } else if(res.msg == '400'){
              Notiflix.Notify.warning('Error! Images not uploaded.',
                {
                width: '300px',
                position: 'center-bottom',
                showOnlyTheLastOne: true,
              });
            } else if(res.msg == '402'){
              Notiflix.Notify.warning('Access denied! Login to upload images.',
                {
                width: '300px',
                position: 'center-bottom',
                showOnlyTheLastOne: true,
              });
            }
            else if(res.msg == '404'){
              Notiflix.Notify.failure('Failed! Files not selected.',
                {
                width: '300px',
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
              width: '300px',
              position: 'center-bottom',
              showOnlyTheLastOne: true,
            });

            }
            else if(err.status == "404"){
              Notiflix.Notify.failure('Failed! no file selected, try again',
              {
                width: '300px',
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
        test(value:any, qu:any){
          if(value && qu){
            console.log(value*qu)
            return value* qu;
          }
          else{
        return null;
          }

        }
        public getTotalAmt(): number {
          let totalAmt = 0;
          if(this.searchProducts==undefined){

          }
          else{
            for (const dataItem of this.searchProducts) {
              totalAmt += dataItem?.amt_total;
            }
            return totalAmt;
          }
    return totalAmt;
        }


    // multiple image upload here
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
            width: '300px',
            position: 'center-bottom',
          });
        }
        else {
          Notiflix.Notify.warning('Failed! Try upload again',
          {
            width: '300px',
            position: 'center-bottom',
          });
        }
      }, err =>{
        if(err.status == "500"){
        Notiflix.Notify.failure('Failed! Error occured, try again',
        {
          width: '300px',
          position: 'center-bottom',
        });

        }})
    }

   // auto complete search request here
   sendData(event:any){
    // console.log(event.target.value);
    let query:string = event.target.value;
    // remove space in the type words
    this.searchDataFn(query)
   }

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

  //  fetchSeries(event: any): any {
  //   if (event.target.value === '') {
  //     return this.searchResult = [];
  //   }
  //   this.searchResult = this.seriesList.filter((series) => {
  //     return series.name.toLowerCase().startsWith(event.target.value.toLowerCase());
  //   })
  // }


    showDetails(series) {
       this.selectedInput = series;
       this.toggle = true;
       this.searchInput = series.name;
      }

      // get auto generate order ID here
      generateOrderID(){
        this.itemOrderID = this.randomOrderId(12)
      }

    //   search(event: any) {
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
    this.product = [] // this set the array to empty so that the droplist can go off
    this.searchProduct(data._id); // here receive the value and send to a function
    //console.log(data)
    }


// getTotalCost() {
//   let sum: number = this.searchProducts.map(a => a.value).reduce(function(a, b)
//   {
//     return a + b;
//   });
//   console.log("Sum Total: ", sum);
// }

// get product ID from search input unchange here and send it to api to fetch details
    searchProduct(id:string){
    console.log(this.searchKey)
    const newSearchKey = Object.assign({
      search_name:id,
      'user_id': this.userDa._id,
      'order_id':this.itemOrderID
    });
    console.log(newSearchKey)
    this._auth.posProduct(newSearchKey).subscribe((res:any) =>{
    //console.log(res)


    this.searchProducts = res;
    //this.getTotalCost();
    let oldTotal = 0;
    oldTotal = this.searchProducts[0].product_sale_price * 1;
    console.log("Old Total: ", oldTotal );
    //this.totalPrice(this.searchProducts)
     }, err =>{
      if(err.status == "500"){
       Notiflix.Notify.failure('Failed! Error occured, try again',
       {
         width: '300px',
         position: 'center-bottom',
      });

       }})
  }




    // total(searchProducts) {
    //   var totalAll = 0;
    //   searchProducts.forEach(element => {
    //     totalAll = totalAll + (element.product_sale_price * element.product_qty);
    //   });
    //   return totalAll;
    // }

  // formatPrice(value) {
  //   let val = (value/1)
  //   return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  // }

  // totalPrice(data) {
  //   this.value=data
  //   console.log("Value Details: ", this.value);
  //   for(let data of this.searchProducts){
  //     this.totalAmt += data.product_sale_price;
  //     console.log("Total List Details: ", this.totalAmt);
  //   }
  //   console.log("Total Details: ", this.totalAmt);
  //   //return this.formatPrice(this.totalAmt);
  // }

  // total() {
  //   return this.searchProducts.reduce(
  //     (sum, x) => ({
  //       qtyTotal: 1,
  //       product_sale_price: sum.product_sale_price + x.qtyTotal * x.product_sale_price
  //     }),
  //     { qtyTotal: 1, product_sale_price: 0 }
  //   ).product_sale_price;
  // }

  // changeSubtotal(item, index) {
  //   const qty = item.qtyTotal;
  //   const amt = item.product_sale_price;
  //   const subTotal = amt * qty;
  //   const subTotal_converted = this.currencyPipe.transform(subTotal, "USD");

  //   this.subTotalItems.toArray()[
  //     index
  //   ].nativeElement.innerHTML = subTotal_converted;

  // }

  // save detail when enter key is press here
      enterKeySave(){
        console.log("Enter key button is press: ", this.searchKey)
      }
      // save the details when save button is click
      saveButtonClick(){
        console.log("Add button is click: ", this.searchKey)
      }

      // this is for testing notification attribute
      checkOutP(){
        Notify.success('Great! Thank you for clicking.',
                {
                //cssAnimationStyle:'zoom',
                cssAnimationStyle:'from-bottom',

                fontSize:'35',
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
