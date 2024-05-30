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
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserProfileMainDetailsComponent } from './components/user-profile-main-details/user-profile-main-details.component';
import { UserProfileAboutSectionComponent } from './components/user-profile-about-section/user-profile-about-section.component';
import { UserProfileExperienceSectionComponent } from './components/user-profile-experience-section/user-profile-experience-section.component';
import { UserProfileExperienceColComponent } from './components/user-profile-experience-col/user-profile-experience-col.component';
import { UserProfileEducationSectionComponent } from './components/user-profile-education-section/user-profile-education-section.component';
import { UserProfileEducationColComponent } from './components/user-profile-education-col/user-profile-education-col.component';
import { UserProfileSkillsSectionComponent } from './components/user-profile-skills-section/user-profile-skills-section.component';
import { UserMainDetailsEditComponent } from './components/user-main-details-edit/user-main-details-edit.component';
import { UserAboutEditComponent } from './components/user-about-edit/user-about-edit.component';
import { UserExperienceEditComponent } from './components/user-experience-edit/user-experience-edit.component';
import { UserEducationEditComponent } from './components/user-education-edit/user-education-edit.component';
import { UserSkillsEditComponent } from './components/user-skills-edit/user-skills-edit.component';
import { ApplyJobConfirmationComponent } from './components/apply-job-confirmation/apply-job-confirmation.component';
import { AppliedJobsComponent } from './components/applied-jobs/applied-jobs.component';
import { AppliedJobsColComponent } from './components/applied-jobs-col/applied-jobs-col.component';
import { ChangeEmailComponent } from './components/change-email/change-email.component';
import { DeleteExperienceComponent } from './components/delete-experience/delete-experience.component';
import { UserAPIServiceService } from './services/user-api-service.service';
import { UserProfileEditModalService } from './services/user-profile-edit-modal.service';
import { ApplyJobConfirmationService } from './services/apply-job-confirmation.service';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './user-store/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { userEffects } from './user-store/user.effects';
import { SavedJobsAndPostsComponent } from './components/saved-jobs-and-posts/saved-jobs.component';
import { SavedPostsComponent } from './components/saved-posts/saved-posts.component';
import { PostsComponent } from './components/posts/posts.component';
import { NetworksComponent } from './components/networks/networks.component';



@NgModule({
  declarations: [
    UserHomeComponent,
    NavbarComponent,
    SideBarComponent,
    DashboardComponent,
    JobListComponent,
    JobDetailedViewComponent,
    UserProfileComponent,
    UserProfileMainDetailsComponent,
    UserProfileAboutSectionComponent,
    UserProfileExperienceSectionComponent,
    UserProfileExperienceColComponent,
    UserProfileEducationSectionComponent,
    UserProfileEducationColComponent,
    UserProfileSkillsSectionComponent,
    UserMainDetailsEditComponent,
    UserAboutEditComponent,
    UserExperienceEditComponent,
    UserEducationEditComponent,
    UserSkillsEditComponent,
    ApplyJobConfirmationComponent,
    AppliedJobsComponent,
    AppliedJobsColComponent,
    ChangeEmailComponent,
    DeleteExperienceComponent,
    SavedJobsAndPostsComponent,
    SavedPostsComponent,
    PostsComponent,
    NetworksComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    StoreModule.forFeature('user',userReducer),
    EffectsModule.forFeature([userEffects])
  ],
  exports:[SharedModule,userRouteModule],
  providers:[
    UserAPIServiceService,
    UserProfileEditModalService,
    ApplyJobConfirmationService
  ]
})
export class UserModule { }
