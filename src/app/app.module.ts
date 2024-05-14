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
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { employerReducer } from './store/employer-store/employer.reducer';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { EffectsModule } from "@ngrx/effects";
import { userEffects } from "./store/user-store/user.effects";
import { userReducer } from "./store/user-store/user.reducer";
import { appState } from "./store/app/appReducer";
import { employerEffects } from "./store/employer-store/employer.effects";


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
    StoreModule.forRoot({user:userReducer,employer:employerReducer}),
    EffectsModule.forRoot([userEffects, employerEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
],
  providers: [
    {provide: TUI_SANITIZER, useClass: NgDompurifySanitizer},
    provideHttpClient(withInterceptors([setTokenInterceptor])),
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
