import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as Notiflix from 'notiflix';
import { Notify } from 'notiflix';
import { AuthService } from 'src/app/services/auth.service';
declare let $: any;
@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css']
})
export class BuyProductComponent implements OnInit{

  productData: any[] = [];

  cartProduct:any[] = [];
  sale_ref_code: any = {};
  ref_code:any = {};


  myId : any = localStorage.getItem('userData');
  @ViewChild('productForm') form: NgForm;


  productInputname: any;
  constructor(private _auth: AuthService,
    private fb: FormBuilder,
      private _router: Router){
  }

  obj2 = {
    "user_createdBy": (JSON.parse(this.myId)),
    "reg_code": this.randomString(25),
   };

  // add new product here
  addNewProduct(){
    const newData = Object.assign(this.form.value, this.obj2);
        console.log(newData);
        this._auth.addNewProduct(newData).subscribe(res =>{
          //console.log(res);
          if(res.msg == '200')
          {
            Notiflix.Notify.success('Product Added Successfully', {
              });
              $('#myModal').modal('hide'); // close the modal here
             //this._router.navigate(['/dashboard']); // redirect back home
             this.form.resetForm();
          }
            else {
              Notiflix.Notify.failure('Sorry! Failed to add Product', {
                });
           }
         }, err =>{
           if(err.status == "400"){
            Notiflix.Notify.failure('Failed! Product ID number already exist',
            {
              width: '300px',
              position: 'center-bottom',
           });
            }
          else if(err.status == "403"){
            Notiflix.Notify.failure('Failed! Some required fields are missing',
            {
              width: '350px',
              position: 'center-bottom',
           });
          }
          else if(err.status == '503'){
            Notiflix.Notify.failure('Failed to register new product', {
              });
          }
        });
  }


  ngOnInit(): void {
this.cartProduct = JSON.parse(localStorage.getItem('cartProduct') || "[]");

  }

  saveToCart(i:number){
this.cartProduct.push(this.productData[i]);
localStorage.setItem('cartProduct',JSON.stringify(this.cartProduct));
}

checkout(){
  this._auth.checkoutProduct(this.cartProduct).subscribe((res)=>{
    console.log(res);
this.cartProduct = [];
localStorage.removeItem('cartProduct')
  })
}

delete(id:string){
  this.cartProduct.splice(this.cartProduct.findIndex((_)=>_._id==id),1);
  localStorage.setItem('cartProduct',JSON.stringify(this.cartProduct));
  }

  // search for product base on the input user enter
  searchProduct(searchForm){
    // console.log(productForm.form.value.product_name)
    // const product_id = Object.assign(this.form.value, this.obj2)
    //console.log(product_id);
    this._auth.findProductData(searchForm.form.value.product_name).subscribe(res =>{
      this.productData = res;
      console.log(this.productData);
      // if(this.productData == null)
      // {
      //   Notiflix.Notify.failure('Sorry! No product found', {
      //   });
      // }
      //console.log(res);

    }, err =>{
      if(err.status == "500"){
       Notiflix.Notify.failure('Failed! Error occured, try again',
       {
         width: '300px',
         position: 'center-bottom',
      });

       }});

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
  //modal method here
  openModal(id:String){
    $('#'+id).modal('show');
  }
  closeModal(id: String){
  $('#' + id).modal('hide');
  }
}
