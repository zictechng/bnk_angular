import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.css']
})
export class AccountProfileComponent  implements OnInit{

  url = '/assets/images/profile/profile.png';
  userDa = (JSON.parse(localStorage.getItem('userData')));
  myData:any = {}
  constructor(private _auth: AuthService,
   private _toastr: ToastrService,
   ){}

  obj2 = ''+this.userDa._id // get the current logged user ID
  profile_name = '';
  file_name = '';

  ngOnInit(): void {
    this.getMyData();
  }
  selectedFile = null;

  onFileSelected(event){
    //console.log(event);
    this.selectedFile = event.target.files[0];
    let fileType = event.target.files[0].type;
    if(fileType.match(/image\/*/)){
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) =>{
        this.url = event.target.result;
        this.file_name = this.selectedFile
      }
    }
    else{
      this._toastr.error('Invalid file format!', 'Failed', {
        timeOut: 3000,
      });
      //window.alert("Select image file only!");
    }
  }
  uploadImage(){
    console.log(this.selectedFile);

    const formData = new FormData();
    formData.append('file', this.file_name);
    formData.append('my_name', this.obj2)
    this._auth.uploadImage(formData).subscribe(res =>{
      console.log(res);
      this._toastr.success('Ticket created successfully', 'Successful', {
        timeOut: 3000,
      });
    })

  }

  // get user profile details here
  getMyData(){
    this._auth.getMyData(this.userDa._id).subscribe(res =>{
      this.myData = res.others;
      //console.log(this.myData);
    });
  }

}
