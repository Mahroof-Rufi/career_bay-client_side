import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { TuiRootModule, TuiDialogModule, TuiAlertModule, TUI_SANITIZER, TuiSvgModule } from "@taiga-ui/core";
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BannerComponent } from './components/banner/banner.component';
import { FeaturesComponent } from './components/features/features.component';
import { JobComponent } from './components/job/job.component';
import { ApplicationTimelineComponent } from './components/application-timeline/application-timeline.component';
import { UsersComponent } from './components/users/users.component';
import { StepsComponent } from './components/steps/steps.component';
import { JobOverviewComponent } from './components/job-overview/job-overview.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { GetStartedComponent } from './components/get-started/get-started.component';
import { userLoginComponent } from "./components/user-login/user-login.component";
import { UserSignUpComponent } from "./components/user-sign-up/user-sign-up.component";
import { CompanyLoginComponent } from "./components/company-login/company-login.component";
import { CompanySignUpComponent } from "./components/company-sign-up/company-sign-up.component";
import { DialogueComponent } from "./components/dialogue/dialogue.component";
import { HomeComponent } from "./components/home/home.component";
import { UserModule } from "./features/user/user.module";
import { CompanyModule } from "./features/company/company.module";
import { AdminModule } from "./features/admin/admin.module";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { setTokenInterceptor } from "./interceptors/set-token.interceptor";
import { NavBarOptionsComponent } from './components/nav-bar-options/nav-bar-options.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { employerReducer } from './store/employer-store/employer.reducer';
import { NotFoundComponent } from './components/not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BannerComponent,
    FeaturesComponent,
    JobComponent,
    ApplicationTimelineComponent,
    UsersComponent,
    StepsComponent,
    JobOverviewComponent,
    ContactUsComponent,
    GetStartedComponent,
    DialogueComponent,
    HomeComponent,
    userLoginComponent,
    UserSignUpComponent,
    CompanyLoginComponent,
    CompanySignUpComponent,
    NavBarOptionsComponent,
    ForgotPasswordComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    TuiSvgModule,
    UserModule,
    CompanyModule,
    AdminModule,
    StoreModule.forRoot({employer:employerReducer}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
],
  providers: [
    {provide: TUI_SANITIZER, useClass: NgDompurifySanitizer},
    provideHttpClient(withInterceptors([setTokenInterceptor])),
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
