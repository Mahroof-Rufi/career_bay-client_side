import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { SharedModule } from '../../shared/shared.module';
import { userRouteModule } from './user-route.module';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { JobListComponent } from './components/job-list/job-list.component';
import { JobDetailedViewComponent } from './components/job-detailed-view/job-detailed-view.component';



@NgModule({
  declarations: [
    UserHomeComponent,
    NavbarComponent,
    SideBarComponent,
    DashboardComponent,
    JobListComponent,
    JobDetailedViewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports:[SharedModule,userRouteModule]
})
export class UserModule { }
