import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { companyRouteModule } from './company-route.module';



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    companyRouteModule
  ],
  exports: [
    SharedModule,
    companyRouteModule
  ]
})
export class CompanyModule { }
