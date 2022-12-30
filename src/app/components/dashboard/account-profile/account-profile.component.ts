import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
declare let $: any;
@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.css']
})
export class AccountProfileComponent  implements OnInit{

  defaultProfileImage = '/assets/images/profile/profile.png'; // this is for default image if user don't have

  serverURL = 'http://localhost:3000'; // this is backend server url
  myProfilePhoto = '';

  userDa = (JSON.parse(localStorage.getItem('userData')));
  myData:any = {}
  constructor(private _auth: AuthService,
   private _toastr: ToastrService,
   ){}

  obj2 = ''+this.userDa._id // get the current logged user ID
  profile_name = '';
  file_name = '';
  myCurrentPhoto = this.myData.photo;

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
        this.defaultProfileImage = event.target.result;
        this.myProfilePhoto = event.target.result;

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
    //console.log(this.selectedFile);

    const formData = new FormData();
    formData.append('file', this.file_name);
    formData.append('user_id', this.obj2)
    this._auth.uploadImage(formData).subscribe(res =>{
      //console.log(res);
      $('#myModal').modal('hide');
      this._toastr.success('Profile photo updated', 'Successful', {
        timeOut: 3000,
      });
      this.getMyData();
    })

  }

  // get user profile details here
  getMyData(){
    this._auth.getMyData(this.userDa._id).subscribe(res =>{
      this.myData = res.others;
      this.myProfilePhoto = this.serverURL+res.others.photo
    });
  }

  openModal(id:String){
      $('#'+id).modal('show');
    }
  closeModal(id: String){
    $('#' + id).modal('hide');
    }
}
