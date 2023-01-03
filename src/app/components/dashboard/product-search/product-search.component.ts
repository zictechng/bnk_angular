import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit{

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

  // get the search result product
  productDetails(){

  }
}
