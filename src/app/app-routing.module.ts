import { FormComponent } from './components/dashboard/form/form.component';
import { TransferFundComponent } from './components/dashboard/transfer-fund/transfer-fund.component';
import { AuthGuard } from './auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/dashboard/home/home.component';
import { ForgetPasswordPageComponent } from './components/forget-password-page/forget-password-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';

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

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
