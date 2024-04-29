import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { adminRouteModule } from './admin-route.module';



@NgModule({
  declarations: [
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
