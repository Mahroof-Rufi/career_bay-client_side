import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { adminRouteModule } from './admin-route.module';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';



@NgModule({
  declarations: [
    AdminLoginComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    adminRouteModule
  ],
  exports: [
    SharedModule,
    adminRouteModule
  ]
})
export class AdminModule { }
