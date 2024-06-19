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
import { UnderReviewApplicantsComponent } from './components/under-review-applicants/under-review-applicants.component';
import { ApplicationsConfirmationModalComponent } from './components/applications-confirmation-modal/applications-confirmation-modal.component';
import { CompanyPostsComponentComponent } from './components/company-posts-component/company-posts-component.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { EmployerApiServiceService } from './services/employer-api-service.service';
import { ApplicationsConfirmationModalService } from './services/applications-confirmation-modal.service';
import { AddPostModalService } from './services/add-post-modal.service';
import { AddJobPostService } from './services/add-job-post-modal.service';
import { DeleteJobConfirmationService } from './services/delete-job-confirmation.service';
import { EmployerEditProfileModalService } from './services/employer-edit-profile-modal.service';
import { StoreModule } from '@ngrx/store';
import { employerReducer } from './store/employer.reducer';
import { EffectsModule } from '@ngrx/effects';
import { employerEffects } from './store/employer.effects';
import { InterviewScheduleComponent } from './components/interview-schedule/interview-schedule.component';



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
    CompanyPostsComponentComponent,
    AddPostComponent,
    InterviewScheduleComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    companyRouteModule,
    StoreModule.forFeature('employer',employerReducer),
    EffectsModule.forFeature([employerEffects])
  ],
  exports: [
    SharedModule,
    companyRouteModule
  ],
  providers:[
    EmployerApiServiceService,
    ApplicationsConfirmationModalService,
    AddPostModalService,
    AddJobPostService,
    DeleteJobConfirmationService,
    EmployerEditProfileModalService
  ]
})
export class CompanyModule { }
