import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { DashboardComponent } from './components/admin-home/dashboard/dashboard.component';
import { adminRouteModule } from './admin-route.module';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { MainPageComponent } from './components/admin-home/admin-home.component';
import { SideBarComponent } from './components/admin-home/side-bar/side-bar.component';
import { ManagementComponent } from './components/admin-home/management/management.component';
import { StoreModule } from '@ngrx/store';
import { adminReducer, adminFeatureKey } from './store/admin.reducer';
import { EffectsModule } from '@ngrx/effects';
import { adminEffects } from './store/admin.effects';
import { AdminApiServiceService } from './services/admin-api-service.service';
import { ChartComponent } from './components/admin-home/dashboard/chart/chart.component';



@NgModule({
  declarations: [
    AdminLoginComponent,
    DashboardComponent,
    MainPageComponent,
    SideBarComponent,
    ManagementComponent,
    ChartComponent,
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
