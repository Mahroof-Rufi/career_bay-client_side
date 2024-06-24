import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { TuiRootModule, TuiDialogModule, TuiAlertModule, TUI_SANITIZER, TuiSvgModule } from "@taiga-ui/core";
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/home-page/navbar/navbar.component';
import { BannerComponent } from './components/home-page/banner/banner.component';
import { FeaturesComponent } from './components/home-page/features-list/features-list.component';
import { ApplicationTimelineComponent } from './components/home-page/features-list/application-timeline/application-timeline.component';
import { UsersComponent } from './components/home-page/features-list/users/users.component';
import { StepsComponent } from './components/home-page/features-list/steps/steps.component';
import { JobOverviewComponent } from './components/home-page/features-list/job-overview/job-overview.component';
import { ContactUsComponent } from './components/home-page/contact-us/contact-us.component';
import { GetStartedComponent } from "./components/home-page/get-started/get-started.component";
import { userLoginComponent } from "./components/login-register-modal/user-login/user-login.component";
import { UserSignUpComponent } from "./components/login-register-modal/user-sign-up/user-sign-up.component";
import { CompanyLoginComponent } from "./components/login-register-modal/company-login/company-login.component";
import { CompanySignUpComponent } from "./components/login-register-modal/company-sign-up/company-sign-up.component";
import { DialogueComponent } from "./components/login-register-modal/login-register-modal.component";
import { HomeComponent } from "./components/home-page/home-page.component";
import { UserModule } from "./features/user/user.module";
import { CompanyModule } from "./features/company/company.module";
import { AdminModule } from "./features/admin/admin.module";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { setTokenInterceptor } from "./interceptors/set-token.interceptor";
import { ForgotPasswordComponent } from './components/login-register-modal/forgot-password/forgot-password.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { handleUnauthorizedResInterceptor } from "./interceptors/handle-unauthorized-res.interceptor";


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BannerComponent,
    FeaturesComponent,
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
    ForgotPasswordComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    UserModule,
    CompanyModule,
    AdminModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
],
  providers: [
    {provide: TUI_SANITIZER, useClass: NgDompurifySanitizer},
    provideHttpClient(withInterceptors([setTokenInterceptor])),
    provideHttpClient(withInterceptors([handleUnauthorizedResInterceptor]))
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
