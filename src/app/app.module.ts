import { AuthGuard } from './auth.guard';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as CanvasJSAngularChart from '../assets/canvasjs.angular.component';
var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { ForgetPasswordPageComponent } from './components/forget-password-page/forget-password-page.component';
import { HomeComponent } from './components/dashboard/home/home.component';
import { FooterComponent } from './components/dashboard/partials/footer/footer.component';
import { SideBarComponent } from './components/dashboard/partials/side-bar/side-bar.component';
import { TopBarComponent } from './components/dashboard/partials/top-bar/top-bar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { TransferFundComponent } from './components/dashboard/transfer-fund/transfer-fund.component';
import { TransferPinComponent } from './components/dashboard/transfer-pin/transfer-pin.component';
import { TransferCotComponent } from './components/dashboard/transfer-cot/transfer-cot.component';
import { TransferImfComponent } from './components/dashboard/transfer-imf/transfer-imf.component';
import { TransferSuccessComponent } from './components/dashboard/transfer-success/transfer-success.component';
import { AccountHistoryComponent } from './components/dashboard/account-history/account-history.component';
import { AccountProfileComponent } from './components/dashboard/account-profile/account-profile.component';
import { AccountStatementComponent } from './components/dashboard/account-statement/account-statement.component';
import { SupportComponent } from './components/dashboard/support/support.component';
import { SettingComponent } from './components/dashboard/setting/setting.component';
import { FormComponent } from './components/dashboard/form/form.component';
import { ToastrModule } from 'ngx-toastr';
import { WalletComponent } from './components/dashboard/wallet/wallet.component';
import { SearchComponent } from './components/dashboard/search/search.component';
import { LoanComponent } from './components/dashboard/loan/loan.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ProductSearchComponent } from './components/dashboard/product-search/product-search.component';
import { FindProductComponent } from './components/dashboard/find-product/find-product.component';
import { EstoreComponent } from './components/dashboard/estore/estore.component';
import { StudentsComponent } from './components/dashboard/students/students.component';
import { DynamicformComponent } from './components/dashboard/dynamicform/dynamicform.component';
import { StudentsdataComponent } from './components/dashboard/studentsdata/studentsdata.component';
import { CreateInvoiceComponent } from './components/dashboard/create-invoice/create-invoice.component';
import { BuyProductComponent } from './components/dashboard/buy-product/buy-product.component';
import { PosComponent } from './components/dashboard/pos/pos.component';
import { OrderformComponent } from './components/dashboard/orderform/orderform.component';
import { OrdercomfirmComponent } from './components/dashboard/ordercomfirm/ordercomfirm.component';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    ForgetPasswordPageComponent,
    HomeComponent,
    FooterComponent,
    SideBarComponent,
    TopBarComponent,
    TransferFundComponent,
    TransferPinComponent,
    TransferCotComponent,
    TransferImfComponent,
    TransferSuccessComponent,
    AccountHistoryComponent,
    AccountProfileComponent,
    AccountStatementComponent,
    SupportComponent,
    SettingComponent,
    FormComponent,
    WalletComponent,
    SearchComponent,
    LoanComponent,
    CanvasJSChart,
    ProductSearchComponent,
    FindProductComponent,
    EstoreComponent,
    StudentsComponent,
    DynamicformComponent,
    StudentsdataComponent,
    CreateInvoiceComponent,
    BuyProductComponent,
    PosComponent,
    OrderformComponent,
    OrdercomfirmComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,

    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
      enableHtml: true,
      closeButton: true,
      tapToDismiss: true,
    }),
  Ng2SearchPipeModule,
  ReactiveFormsModule,
  NgxPaginationModule,
  NgSelectModule,
  ],
  providers: [AuthService, AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
