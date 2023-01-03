import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-find-product',
  templateUrl: './find-product.component.html',
  styleUrls: ['./find-product.component.css']
})
export class FindProductComponent implements OnInit{

  searchProductData:any[] = [];
  loading:Boolean = false;
  searchName :any = {}

  constructor(private _auth: AuthService,
    private _router: Router,
    private _toastr: ToastrService){}


  ngOnInit(): void {

  }

  productSearch(){
    console.log(this.searchName);
    this._auth.productSearch(this.searchName).
  subscribe(res =>{
    this.searchProductData = res;
    console.log(res);
    this._toastr.success('Found product', 'Successful', {
      timeOut: 3000,
    });
    //console.log(res);
  }, err =>{
     if(err.status == "402"){
      this._toastr.error('Product not found', 'Failed', {
        timeOut: 3000,
      });

  } else if(err.status == "403"){
    this._toastr.error('User account not active, or account blocked!', 'Error occured!', {
      timeOut: 3000,
    });

    }
  })
  }

}
