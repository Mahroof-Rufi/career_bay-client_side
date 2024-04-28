import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { TuiRootModule, TuiDialogModule, TuiAlertModule, TUI_SANITIZER, TuiSvgModule } from "@taiga-ui/core";
import { TuiFieldErrorPipeModule, TuiInputModule, TuiTextareaModule } from '@taiga-ui/kit';
import { NgModule } from '@angular/core';
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
import { ReactiveFormsModule } from "@angular/forms";
import { FooterComponent } from './components/footer/footer.component';
import { LogoComponent } from './components/logo/logo.component';
import { GetStartedComponent } from './components/get-started/get-started.component';
import { SharedModule } from "./shared/shared.module";
import { AuthModule } from "./features/auth/auth.module";
import { DialogueComponent } from './components/dialogue/dialogue.component';
import { UserModule } from "./features/user/user.module";


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
    FooterComponent,
    LogoComponent,
    GetStartedComponent,
    DialogueComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    TuiSvgModule,
    AuthModule,
],
  providers: [{provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}],
  bootstrap: [AppComponent]
})
export class AppModule { }
