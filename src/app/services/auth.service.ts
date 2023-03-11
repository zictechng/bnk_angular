import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Product{
  _id: string,
  product_name: string
}



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
  private _acct_historyWalletUrl = "http://localhost:3000/api/history-wallet/";

  private _userProfileUrl = "http://localhost:3000/api/profile/";

  private _supportTicketUrl = "http://localhost:3000/api/support";
  private _incomeUrl = "http://localhost:3000/api/income_details/";
  private _uploadImageUrl = "http://localhost:3000/api/upload";
  private _deleteHistoryUrl = "http://localhost:3000/api/delete-history/";
  private _deleteCheckHistoryUrl = "http://localhost:3000/api/history_delete";
  private _productSearchUrl = "http://localhost:3000/api/product-search/";

  private _getHistoryhUrl = "http://localhost:3000/api/histories";

  private _getFinanceAnnalyUrl = "http://localhost:3000/api/finance";
  private _getWalletFinaceUrl = "http://localhost:3000/api/wallet-finance/";
  private _getStatementUrl = "http://localhost:3000/api/statement-details";
  private _formDatatUrl = "http://localhost:3000/api/form-data";

  private _createInvoiceUrl = "http://localhost:3000/api/create-invoice";

  private _regStudentUrl = "http://localhost:3000/api/students";
  private _getStudentUrl = "http://localhost:3000/api/fetch_students";
  private _getStudentDataUrl = "http://localhost:3000/api/fetch_studentsData";
  private _regDynamicDatatUrl = "http://localhost:3000/api/dynamicform";

  private _rankDynamicPostionUrl = "http://localhost:3000/api/student-position";
  private _product_dataUrl = "http://localhost:3000/api/fetch_product";
  private _checkout = "http://localhost:3000/api/checkout";
  private _addNew_ProductUrl = "http://localhost:3000/api/add-product";
  private _search_ProductUrl = "http://localhost:3000/api/search";
  private _search_posProductUrl = "http://localhost:3000/api/search-pos";
  private _baseURL = "http://localhost:3000/api"
  private _search_posUrl = "http://localhost:3000/api/fetchpos";
  private _item_orderUrl = "http://localhost:3000/api/item_order";

  private _dynamicDataUrl = "http://localhost:3000/api/dynamic_data";


  private _orderDataStream = new BehaviorSubject("");

  constructor(private http: HttpClient,
    private _router: Router) { }

    recordId:any = '';
    userId : any = '';

    defaultProfileImage = '/assets/images/profile/profile.png'; // this is for default image if user don't have

    serverURL = 'http://localhost:3000'; // this is backend server url

    //passing order form data to another page here
    getDataStream(){ // get the data info
      return this._orderDataStream.asObservable();
    }

    orderDataPassed(data: any){ // receive the info fill into the form here
      this._orderDataStream.next(data);
    }

  // register method that process the registration
  registerUser(user:any){
    return this.http.post<any>(this._registerUrl, user);
  }

  // register new student method that process the registration
  registerNewStudent(user:any){
    return this.http.post<any>(this._regStudentUrl, user);
  }

  //this return all student details
  fetchStudent(){
    return this.http.get<any>(this._getStudentUrl)
    }

    //this return all student data to get position ranking details
  fetchStudentData(){
    return this.http.get<any>(this._getStudentDataUrl)
    }

  //this return chart finance details
  dailyFinance(){
    return this.http.get<any>(this._getFinanceAnnalyUrl)
    pipe(
      map(result => result)
    )
  }
  //this return wallet chart finance details
  walletDailyFinance(id:any){
    return this.http.get<any>(this._getWalletFinaceUrl + id)
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

// get account statement pagination here
statementPagination(page: number, pageSize:number){
  return this.http.get<any>(this._getStatementUrl+'?page='+page+'&pageSize='+pageSize);
}

// get account history statement here
accountHistory(page: number, pageSize: number){
  return this.http.get<any>(this._acct_historyUrl+'?page='+page+'&pageSize='+pageSize);
}

// get account history statement here
accountHistoryWallet(id:any){
  return this.http.get<any>(this._acct_historyWalletUrl + id);
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

//delete history record here...
deleteHistoryCheckBox(ids:String[]){
  return this.http.post<any>(this._deleteCheckHistoryUrl, ids);
}

//get history pagination here
getHistoryDetails(page: number){
  return this.http.get<any>(this._getHistoryhUrl + '?page='+page);
}
//post dynamic data to backend via service here...
postFormData(datas:any){
  return this.http.post<any>(this._formDatatUrl, datas);
}

//post dynamic invoice data to backend via service here...
postInvoiceFormData(invoiceDatas:any){
  console.log(invoiceDatas)
  return this.http.post<any>(this._createInvoiceUrl, invoiceDatas);
}

// post dynamic table data here
dynamicTableData(tableData: any){
  return this.http.post<any>(this._regDynamicDatatUrl, tableData);
}

// post student position data here
savePosition(positionData: any){
  return this.http.post<any>(this._rankDynamicPostionUrl, positionData);
}

// searchProduct(product_keyData:string){
// return this.http.post(this._search_ProductUrl, product_keyData);
// }

// getPaginatedPermissionUsage(page, pageType, pageSize){
//   return this.http.get('http://localhost:3000/api/histories/paginated?page='+page+'&pageType='+pageType+'&pageSize='+pageSize);
// }

// get product search details here
productSearch(id:any){
  return this.http.get<any>(this._productSearchUrl + id);
}

// fetch sale product when user type/scan product name
findProductData(productData:any){
  return this.http.get<any>(this._product_dataUrl+'/'+productData)
}

// pos product search api call here..
posProduct(searchKey:any){
  console.log(searchKey);
  return this.http.post(this._search_posProductUrl, searchKey )
}

checkoutProduct(payload:any){
return this.http.post(this._checkout,payload);
}

// pos product live search fetching...
searchPosProduct(query:any){
  return this.http.post<{payload: Array<Product>}>(this._search_posUrl,{payload: query}).pipe(
    map(data => data.payload)
  );
  }


// Register new product details here name
addNewProduct(addproductData:any){
  return this.http.post<any>(this._addNew_ProductUrl, addproductData)
}

// post item order selected data here
saveItemOrder(itemData: any){
  return this.http.post<any>(this._item_orderUrl, itemData);
}

// post item order selected data here
sendDynamicData(dataSend: any){
  return this.http.post<any>(this._dynamicDataUrl, dataSend);
}



getLocalStorage(){
 return this.recordId = localStorage.getItem('userData');
 }

 orderCreateAPI(orderDetails:any){
return this.http.post(this._baseURL+'order/create', orderDetails);
 }
}
