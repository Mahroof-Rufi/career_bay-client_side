import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { adminRouteModule } from './admin-route.module';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { UsersComponent } from './components/users/users.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { StoreModule } from '@ngrx/store';
import { adminReducer, adminFeatureKey } from './store/admin.reducer';
import { EffectsModule } from '@ngrx/effects';
import { adminEffects } from './store/admin.effects';
import { AdminApiServiceService } from './services/admin-api-service.service';



@NgModule({
  declarations: [
    AdminLoginComponent,
    DashboardComponent,
    MainPageComponent,
    SideBarComponent,
    UsersComponent,
    CompaniesComponent,
    JobsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    adminRouteModule,
    StoreModule.forFeature(adminFeatureKey,adminReducer),
    EffectsModule.forFeature([adminEffects]),
  ],
  exports: [
    SharedModule,
    adminRouteModule
  ],
  providers: [AdminApiServiceService]
})
export class AdminModule { }
