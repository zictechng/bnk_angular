import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as Notiflix from 'notiflix';
import { debounceTime, Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

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



  myId : any = localStorage.getItem('userData');
  @ViewChild('posForm') form: NgForm;
  products : any = [];
  searchName: string = '';
  keyUpSubject = new Subject<any>();
  constructor(private _auth: AuthService,
    private fb: FormBuilder,
      private _router: Router){

  }

//   public seriesList:any = [
//     {
//          "name": "Prison Break",
//          "description": "Structural Engineer Michael Scofield turns himself into the Fox River Penitentiary in order to break out his brother Lincoln Burrows, who is on death row for the murder of the Vice President's brother. But Lincoln was set up by some of the Company (an agency formed by corrupt government officials) guys, headed by General Jonathan Krantz. Michael breaks out from Fox River with his brother Lincoln and other convicts.",
//          "genres": "Action, Crime, Drama, Mystery, Thriller",
//          "releaseDate": "29 August 2005 (USA)"
//      },
//      {
//       "name": "Prison Break",
//       "description": "Structural Engineer Michael Scofield turns himself into the Fox River Penitentiary in order to break out his brother Lincoln Burrows, who is on death row for the murder of the Vice President's brother. But Lincoln was set up by some of the Company (an agency formed by corrupt government officials) guys, headed by General Jonathan Krantz. Michael breaks out from Fox River with his brother Lincoln and other convicts.",
//       "genres": "Action, Crime, Drama, Mystery, Thriller",
//       "releaseDate": "29 August 2005 (USA)"
//   },
//  {
//       "name": "Vikings",
//       "description": "The adventures of Ragnar Lothbrok: the greatest hero of his age. The series tells the saga of Ragnar's band of Viking brothers and his family as he rises to become King of the Viking tribes. As well as being a fearless warrior, Ragnar embodies the Norse traditions of devotion to the gods: legend has it that he was a direct descendant of Odin, the god of war and warriors.",
//       "genres": "Action, Drama, History, War",
//       "releaseDate": "3 March 2013 (USA)"
//   },
// {
//       "name": "Person of Interest",
//       "description": "A billionaire software-genius named Harold Finch creates a Machine for the government that is designed to detect acts of terror before they can happen, by monitoring the entire world through every cell-phone, email and surveillance camera. Finch discovered that the machine sees everything, potential terrorist acts and violent crimes that involve ordinary people.",
//       "genres": "Action, Drama, Mystery, Sci-Fi, Thriller",
//       "releaseDate": "22 September 2011 (USA)"
//   },


//    //Truncated for brevity
//    ]

  obj2 = {
    "user_createdBy": (JSON.parse(this.myId)),
    "reg_code": this.randomString(25),
   };
   public selectedValue: any;
   public searchValue: any;
   public filteredList: any = [];
   ngOnInit() {

   }

   abc(){
    console.log('hi');
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

// call search api here
  searchProduct(){
    console.log(this.form.value)
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

  // save all the here
  saveOrder(){

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
