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
const routes: Routes = [
    { path: 'admin', component:MainPageComponent, children:[
        { path: 'login', component: AdminLoginComponent },
        { path: 'dashboard', component: DashboardComponent, canActivate:[adminAuthGuard]  },
        { path: 'users', component:UsersComponent, canActivate:[loadUsersGuard] },
        { path: 'companies', component:CompaniesComponent },
        { path: 'jobs', component:JobsComponent }
    ]} 
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class adminRouteModule { }