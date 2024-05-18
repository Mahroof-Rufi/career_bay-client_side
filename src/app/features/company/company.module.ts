import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './components/profile/profile.component';
import { SharedModule } from '../../shared/shared.module';
import { companyRouteModule } from './company-route.module';
import { JobComponent } from './components/job/job.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { MainComponentComponent } from './components/main-component/main-component.component';
import { AddJobComponent } from './components/add-job/add-job.component';
import { TuiDataListDropdownManagerModule } from '@taiga-ui/kit';
import { UnderReviewApplicantsComponent } from './components/under-review-applicants/under-review-applicants.component';
import { ApplicationsConfirmationModalComponent } from './components/applications-confirmation-modal/applications-confirmation-modal.component';



@NgModule({
  declarations: [
    ProfileComponent,
    JobComponent,
    SideBarComponent,
    EditProfileComponent,
    MainComponentComponent,
    AddJobComponent,
    UnderReviewApplicantsComponent,
    ApplicationsConfirmationModalComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    companyRouteModule,
  ],
  exports: [
    SharedModule,
    companyRouteModule
  ]
})
export class CompanyModule { }
