import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TuiArrowModule,
  TuiAvatarModule,
  TuiBadgedContentModule,
  TuiCheckboxLabeledModule,
  TuiDataListDropdownManagerModule,
  TuiDataListWrapperModule, 
  TuiInputDateModule, 
  TuiInputDateTimeModule, 
  TuiInputFilesModule, 
  TuiInputModule, 
  TuiInputPasswordModule, 
  TuiInputPhoneInternationalModule, 
  TuiInputPhoneModule, 
  TuiMultiSelectModule, 
  TuiSelectModule, 
  TuiTextareaModule,
} from '@taiga-ui/kit';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiAlertModule, TuiButtonModule, TuiDataListModule, TuiDialogModule, TuiDropdownModule, TuiHintModule, TuiHostedDropdownModule, TuiRootModule, TuiSvgModule, TuiTextfieldControllerModule, TuiTooltipModule } from '@taiga-ui/core';
import { HttpClientModule } from '@angular/common/http';
import { LogoComponent } from './components/logo/logo.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavBarOptionsComponent } from './components/nav-bar-options/nav-bar-options.component';
import { JobPostComponent } from './components/job-post/job.component';
import { SearchComponent } from './components/search/search.component';
import { UserProfileCommonViewComponent } from './components/user-profile-common-view/user-profile-common-view.component';
import { UserProfileAboutViewComponent } from './components/user-profile-about-view/user-profile-about-view.component';
import { UserExperienceColViewComponent } from './components/user-experience-col-view/user-experience-col-view.component';
import { UserExperienceSectionViewComponent } from './components/user-experience-section-view/user-experience-section-view.component';
import { UserEducationColViewComponent } from './components/user-education-col-view/user-education-col-view.component';
import { UserEducationSectionViewComponent } from './components/user-education-section-view/user-education-section-view.component';
import { UserSkillsSectionViewComponent } from './components/user-skills-section-view/user-skills-section-view.component';
import { CompanyProfileCommonViewComponent } from './components/company-profile-common-view/company-profile-common-view.component';
import { JobsApiServiceService } from './services/jobs-api-service.service';
import { PostsApiServiceService } from './services/posts-api-service.service';
import { PaginationComponent } from './components/pagination/pagination.component';
import { FilterComponent } from './components/filter/filter.component';
import { PeopleComponent } from './components/people/people.component';
import { CompanyComponent } from './components/company/company.component';
import { RouterModule } from '@angular/router';
import { InboxComponent } from './components/inbox/inbox.component';
import { LiveMeetComponent } from './components/live-meet/live-meet.component';
import { JobDetailedViewComponent } from './components/job-detailed-view/job-detailed-view.component';
import { GetStartedComponent } from './components/get-started/get-started.component';
import { UsersProfileComponent } from './components/users-profile/users-profile.component';
import { TuiActiveZoneModule } from '@taiga-ui/cdk';
import { PostComponent } from './components/post/post.component';

@NgModule({
  declarations: [
    LogoComponent,
    FooterComponent,
    NavBarOptionsComponent,
    JobPostComponent,
    SearchComponent,
    UserProfileCommonViewComponent,
    UserProfileAboutViewComponent,
    UserExperienceColViewComponent,
    UserExperienceSectionViewComponent,
    UserEducationColViewComponent,
    UserEducationSectionViewComponent,
    UserSkillsSectionViewComponent,
    CompanyProfileCommonViewComponent,
    PaginationComponent,
    FilterComponent,
    PeopleComponent,
    CompanyComponent,
    InboxComponent,
    LiveMeetComponent,
    JobDetailedViewComponent,
    GetStartedComponent,
    UsersProfileComponent,
    PostComponent
  ],
  imports: [
    CommonModule,
    TuiInputModule,
    TuiTextareaModule,
    FormsModule,
    ReactiveFormsModule,
    TuiInputPasswordModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiSelectModule,
    TuiInputDateModule,
    HttpClientModule,
    TuiAlertModule,
    TuiInputFilesModule,
    TuiTooltipModule,
    TuiHintModule,
    TuiInputPhoneModule,
    TuiInputPhoneInternationalModule,
    TuiTextareaModule,
    TuiCheckboxLabeledModule,
    TuiTextfieldControllerModule,
    TuiArrowModule,
    TuiBadgedContentModule,
    TuiAvatarModule,
    TuiDataListDropdownManagerModule,
    TuiDataListWrapperModule,
    TuiHostedDropdownModule,
    RouterModule,
    TuiInputDateTimeModule,
    TuiDropdownModule,
    TuiMultiSelectModule,
    TuiButtonModule,
    TuiActiveZoneModule,
    TuiDialogModule
  ],
  exports: [
    TuiInputModule,
    TuiTextareaModule,
    FormsModule,
    ReactiveFormsModule,
    TuiInputPasswordModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiSelectModule,
    TuiInputDateModule,
    HttpClientModule,
    TuiAlertModule,
    TuiInputFilesModule,
    TuiTooltipModule,
    TuiHintModule,
    LogoComponent,
    FooterComponent,
    NavBarOptionsComponent,
    TuiInputPhoneModule,
    TuiInputPhoneInternationalModule,
    TuiTextareaModule,
    TuiCheckboxLabeledModule,
    TuiTextfieldControllerModule,
    TuiArrowModule,
    NavBarOptionsComponent,
    JobPostComponent,
    SearchComponent,
    TuiDataListDropdownManagerModule,
    TuiDataListWrapperModule ,
    TuiHostedDropdownModule,
    PaginationComponent,
    FilterComponent,
    PeopleComponent,
    CompanyComponent,
    InboxComponent,
    TuiInputDateTimeModule,
    JobDetailedViewComponent,
    TuiDropdownModule,
    TuiMultiSelectModule,
    TuiButtonModule,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    TuiSvgModule,
    GetStartedComponent,
    UsersProfileComponent,
    TuiActiveZoneModule,
    TuiAvatarModule,
    PostComponent
  ],
  providers: [
    JobsApiServiceService,
    PostsApiServiceService
  ]
})
export class SharedModule { }
