import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as Notiflix from 'notiflix';
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

 // search product interface model call here
 product:any[] = [];
 hasQuery:Boolean = false;


  myId : any = localStorage.getItem('userData');
  @ViewChild('posForm') form: NgForm;
  products : any = [];
  searchName: string = '';
  keyUpSubject = new Subject<any>();
  constructor(private _auth: AuthService,
    private fb: FormBuilder,
      private _router: Router){

  }


  obj2 = {
    "user_createdBy": (JSON.parse(this.myId)),
    "reg_code": this.randomString(25),
   };
   public selectedValue: any;
   public searchValue: any;
   public filteredList: any = [];

   ngOnInit() {

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


  search(event: any) {
    const value = event.target.value;
    this.searchName = value;
    this.keyUpSubject.next(value);
   const newSearchKey = Object.assign(this.form.value);
   console.log(newSearchKey)
   this._auth.posProduct(newSearchKey).subscribe((res:any) =>{
   console.log(res)
   this.products = res;
    }, err =>{
     if(err.status == "500"){
      Notiflix.Notify.failure('Failed! Error occured, try again',
      {
        width: '300px',
        position: 'center-bottom',
     });

      }})
  }
      searchKey = ''

          selectFromSearch(data:any){
          this.searchKey = data.product_name;
          this.hasQuery = false
          // this.searchDataFn(this.searchKey);
          this.product = []
          this.searchProduct(data._id);
          //console.log(data)
          }
// call product ID from search input unchange here
  searchProduct(id:string){
    console.log(this.searchKey)
    const newSearchKey = Object.assign({search_name:id});
    console.log(newSearchKey)
    this._auth.posProduct(newSearchKey).subscribe((res:any) =>{
    console.log(res)
    this.products = res;
     }, err =>{
      if(err.status == "500"){
       Notiflix.Notify.failure('Failed! Error occured, try again',
       {
         width: '300px',
         position: 'center-bottom',
      });

       }})
  }

  // save all the here
      enterKeySave(){
        console.log(this.searchKey)
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
