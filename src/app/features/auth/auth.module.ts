import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { userLoginComponent } from './components/user-login/user-login.component';
import { SharedModule } from '../../shared/shared.module';
import { authRouteModule } from './auth-route.module';
import { RouterModule } from '@angular/router';
import { UserSignUpComponent } from './components/user-sign-up/user-sign-up.component';
import { UserModule } from '../user/user.module';



@NgModule({
  declarations: [
    userLoginComponent,
    UserSignUpComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    UserModule
  ],
  exports:[SharedModule,authRouteModule,UserModule]
})
export class AuthModule { }
