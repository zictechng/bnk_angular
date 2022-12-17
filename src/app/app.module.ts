import { AuthGuard } from './auth.guard';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { ForgetPasswordPageComponent } from './components/forget-password-page/forget-password-page.component';
import { HomeComponent } from './components/dashboard/home/home.component';
import { FooterComponent } from './components/dashboard/partials/footer/footer.component';
import { SideBarComponent } from './components/dashboard/partials/side-bar/side-bar.component';
import { TopBarComponent } from './components/dashboard/partials/top-bar/top-bar.component';
import {FormsModule} from '@angular/forms';
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
    FormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
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
