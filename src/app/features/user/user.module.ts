import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserHomeComponent } from './components/home/user-home.component';
import { SharedModule } from '../../shared/shared.module';
import { userRouteModule } from './user-route.module';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/home/navbar/navbar.component';
import { SideBarComponent } from './components/home/side-bar/side-bar.component';
import { DashboardComponent } from './components/home/dashboard/dashboard.component';
import { JobListComponent } from './components/home/job-list/job-list.component';
import { UserProfileComponent } from './components/home/user-profile/user-profile.component';
import { UserProfileMainDetailsComponent } from './components/home/user-profile/user-profile-main-details/user-profile-main-details.component';
import { UserProfileAboutSectionComponent } from './components/home/user-profile/user-profile-about-section/user-profile-about-section.component';
import { UserProfileExperienceSectionComponent } from './components/home/user-profile/user-profile-experience-section/user-profile-experience-section.component';
import { UserProfileExperienceColComponent } from './components/home/user-profile/user-profile-experience-section/user-profile-experience-col/user-profile-experience-col.component';
import { UserProfileEducationSectionComponent } from './components/home/user-profile/user-profile-education-section/user-profile-education-section.component';
import { UserProfileEducationColComponent } from './components/home/user-profile/user-profile-education-section/user-profile-education-col/user-profile-education-col.component';
import { UserProfileSkillsSectionComponent } from './components/home/user-profile/user-profile-skills-section/user-profile-skills-section.component';
import { UserMainDetailsEditComponent } from './components/home/user-profile/user-profile-main-details/user-main-details-edit/user-main-details-edit.component';
import { UserAboutEditComponent } from './components/home/user-profile/user-profile-about-section/user-about-edit/user-about-edit.component';
import { UserExperienceEditComponent } from './components/home/user-profile/user-profile-experience-section/user-experience-edit/user-experience-edit.component';
import { UserEducationEditComponent } from './components/home/user-profile/user-profile-education-section/user-education-edit/user-education-edit.component';
import { UserSkillsEditComponent } from './components/home/user-profile/user-profile-skills-section/user-skills-edit/user-skills-edit.component';
import { ApplyJobConfirmationComponent } from './components/apply-job-confirmation/apply-job-confirmation.component';
import { AppliedJobsComponent } from './components/home/applied-jobs/applied-jobs.component';
import { AppliedJobsColComponent } from './components/home/applied-jobs/applied-jobs-col/applied-jobs-col.component';
import { ChangeEmailComponent } from './components/home/change-email/change-email.component';
import { DeleteExperienceComponent } from './components/delete-experience/delete-experience.component';
import { UserAPIServiceService } from './services/user-api-service.service';
import { UserProfileEditModalService } from './services/user-profile-edit-modal.service';
import { ApplyJobConfirmationService } from './services/apply-job-confirmation.service';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './user-store/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { userEffects } from './user-store/user.effects';
import { SavedJobsAndPostsComponent } from './components/home/saved-jobs-and-posts/saved-jobs.component';
import { SavedPostsComponent } from './components/home/saved-jobs-and-posts/saved-posts/saved-posts.component';
import { PostsComponent } from './components/home/posts/posts.component';
import { NetworksComponent } from './components/home/networks/networks.component';
import { ScheduledInterviewsComponent } from './components/home/scheduled-interviews/scheduled-interviews.component';



@NgModule({
  declarations: [
    UserHomeComponent,
    NavbarComponent,
    SideBarComponent,
    DashboardComponent,
    JobListComponent,
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
    ScheduledInterviewsComponent,  
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
