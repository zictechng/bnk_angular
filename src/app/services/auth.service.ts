import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = "http://localhost:3000/api/register";
  private _login = "http://localhost:3000/api/login";
  private _transferfundUrl = "http://localhost:3000/api/sendfund";
  private _transferpinUrl = "http://localhost:3000/api/pin";
  private _transfercotUrl = "http://localhost:3000/api/cot";
  private _transferimfUrl = "http://localhost:3000/api/imf";
  private _acct_statementUrl = "http://localhost:3000/api/statement";
  private _acct_historyUrl = "http://localhost:3000/api/history";

  private _userProfileUrl = "http://localhost:3000/api/profile/";

  private _supportTicketUrl = "http://localhost:3000/api/support";
  private _incomeUrl = "http://localhost:3000/api/income_details/";
  private _uploadImageUrl = "http://localhost:3000/api/upload";
  private _deleteHistoryUrl = "http://localhost:3000/api/delete-history/";

  constructor(private http: HttpClient,
    private _router: Router) { }

    recordId:any = '';
    userId : any = '';

    defaultProfileImage = '/assets/images/profile/profile.png'; // this is for default image if user don't have

    serverURL = 'http://localhost:3000'; // this is backend server url


  // register method that process the registration
  registerUser(user:any){
    return this.http.post<any>(this._registerUrl, user);
  }

  // register method that process the registration
  loginUser(user:any){
    return this.http.post<any>(this._login, user);
  }

  loggedIn(){
    return !! localStorage.getItem('token'); // then !! mean is a boolean operation to return
    // true or false
  }
// method/function to logout users

  // method to get token from localstorage
getToken(){
  return localStorage.getItem('token');
}

// fund transfer method that process the fund transfer operation
transferFund(user:any) :Observable<any>{
  return this.http.post<any>(this._transferfundUrl, user);
}
// transfer pin method that validate user fund transfer operation
transferPin(user:any) :Observable<any>{
  return this.http.post<any>(this._transferpinUrl, user);
}

// transfer cot method that validate user fund transfer operation
cotConfirm(user:any){
  return this.http.post<any>(this._transfercotUrl, user);
}

// transfer cot method that validate user fund transfer operation
imfConfirm(user:any){
  return this.http.post<any>(this._transferimfUrl, user);
}

// get account statement here
accountStatement(){
  return this.http.get<any>(this._acct_statementUrl);
}

// get account history statement here
accountHistory(){
  return this.http.get<any>(this._acct_historyUrl);
}

// get user profile details here
getMyData(id:any){
  return this.http.get<any>(this._userProfileUrl + id);
}

// get user profile details here
getMyIncomeFlow(id:any){
  return this.http.get<any>(this._incomeUrl + id);
}


// submit ticket support here
supportTicket(user:any){
  return this.http.post<any>(this._supportTicketUrl, user);
}

// submit ticket support here
uploadImage(user:any){
  return this.http.post<any>(this._uploadImageUrl, user);
}

//delete history record here...
deleteHistory(id:any){
  return this.http.get<any>(this._deleteHistoryUrl + id);
}


getLocalStorage(){
 return this.recordId = localStorage.getItem('userData');
 }
}
