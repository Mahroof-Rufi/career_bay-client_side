import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './components/profile/profile.component';
import { SharedModule } from '../../shared/shared.module';
import { companyRouteModule } from './company-route.module';
import { JobComponent } from './components/job/job.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';



@NgModule({
  declarations: [
    ProfileComponent,
    JobComponent,
    SideBarComponent
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
