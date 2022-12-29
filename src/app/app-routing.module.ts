import { LoanComponent } from './components/dashboard/loan/loan.component';
import { SearchComponent } from './components/dashboard/search/search.component';
import { WalletComponent } from './components/dashboard/wallet/wallet.component';
import { TransferPinComponent } from './components/dashboard/transfer-pin/transfer-pin.component';
import { TransferImfComponent } from './components/dashboard/transfer-imf/transfer-imf.component';
import { SupportComponent } from './components/dashboard/support/support.component';
import { AccountHistoryComponent } from './components/dashboard/account-history/account-history.component';
import { AccountProfileComponent } from './components/dashboard/account-profile/account-profile.component';
import { FormComponent } from './components/dashboard/form/form.component';
import { TransferFundComponent } from './components/dashboard/transfer-fund/transfer-fund.component';
import { AuthGuard } from './auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/dashboard/home/home.component';
import { ForgetPasswordPageComponent } from './components/forget-password-page/forget-password-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { AccountStatementComponent } from './components/dashboard/account-statement/account-statement.component';
import { SettingComponent } from './components/dashboard/setting/setting.component';
import { TransferCotComponent } from './components/dashboard/transfer-cot/transfer-cot.component';
import { TransferSuccessComponent } from './components/dashboard/transfer-success/transfer-success.component';

const routes: Routes = [
  {path: '', component: LoginPageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'register', component: RegisterPageComponent},
  {path: 'forget-password', component: ForgetPasswordPageComponent},
  {path: 'dashboard', component: HomeComponent,
  canActivate: [AuthGuard] // this is the protecting guard to protect this route from unoauthorized users
},
{path: 'transfer', component: TransferFundComponent},
{path: 'forms', component: FormComponent},
{path: 'account-statement', component: AccountStatementComponent},
{path: 'profile', component: AccountProfileComponent},
{path: 'history', component: AccountHistoryComponent},
{path: 'setting', component: SettingComponent},
{path: 'support', component: SupportComponent},
{path: 'cot', component: TransferCotComponent},
{path: 'imf', component: TransferImfComponent},
{path: 'pin', component: TransferPinComponent},
{path: 'successful', component: TransferSuccessComponent},
{path: 'ewallet', component: WalletComponent},
{path: 'search', component: SearchComponent},
{path: 'loan', component: LoanComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
