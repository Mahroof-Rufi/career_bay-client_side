import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { userLoginComponent } from './components/user-login/user-login.component';
import { SharedModule } from '../../shared/shared.module';
import { authRouteModule } from './auth-route.module';
import { RouterModule } from '@angular/router';
import { UserSignUpComponent } from './components/user-sign-up/user-sign-up.component';
import { UserModule } from '../user/user.module';
import { CompanyLoginComponent } from './components/company-login/company-login.component';
import { CompanySignUpComponent } from './components/company-sign-up/company-sign-up.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { CompanyModule } from '../company/company.module';
import { AdminModule } from '../admin/admin.module';



@NgModule({
  declarations: [
    userLoginComponent,
    UserSignUpComponent,
    CompanyLoginComponent,
    CompanySignUpComponent,
    AdminLoginComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    UserModule,
    CompanyModule,
    AdminModule
  ],
  exports:[SharedModule,authRouteModule,UserModule],
  
})
export class AuthModule { }
