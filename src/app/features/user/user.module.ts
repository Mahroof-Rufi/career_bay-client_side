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
    UserProfileSkillsSectionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports:[SharedModule,userRouteModule]
})
export class UserModule { }
