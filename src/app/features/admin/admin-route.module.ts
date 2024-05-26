import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { adminAuthGuard } from "./route-guards/admin-auth.guard";
import { AdminLoginComponent } from "./components/admin-login/admin-login.component";
import { MainPageComponent } from "./components/main-page/main-page.component";
import { UsersComponent } from "./components/users/users.component";
import { CompaniesComponent } from "./components/companies/companies.component";
import { JobsComponent } from "./components/jobs/jobs.component";
import { loadUsersGuard } from "./route-guards/load-users.guard";
import { loadCompaniesGuard } from "./route-guards/load-companies.guard";
import { UserProfileCommonViewComponent } from "../../shared/components/user-profile-common-view/user-profile-common-view.component";
import { CompanyProfileCommonViewComponent } from "../../shared/components/company-profile-common-view/company-profile-common-view.component";
const routes: Routes = [
    { path: '', component:MainPageComponent, children:[
        { path: 'dashboard', component: DashboardComponent, canActivate:[adminAuthGuard]  },
        { path: 'users', component:UsersComponent, canActivate:[loadUsersGuard] },
        { path: 'user/:id', component:UserProfileCommonViewComponent, canActivate:[loadUsersGuard] },
        { path: 'companies', component:CompaniesComponent, canActivate:[loadCompaniesGuard] },
        { path: 'company/:id', component:CompanyProfileCommonViewComponent, canActivate:[loadCompaniesGuard] },
        { path: 'jobs', component:JobsComponent }
    ]},
    { path: 'login', component: AdminLoginComponent }, 
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class adminRouteModule { }