import { RouterModule, Routes } from "@angular/router";
import { UserHomeComponent } from "./components/user-home/user-home.component";
import { NgModule } from "@angular/core";
import { userAuthGuard } from "./route-guards/user-auth.guard";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { JobListComponent } from "./components/job-list/job-list.component";
import { JobDetailedViewComponent } from "./components/job-detailed-view/job-detailed-view.component";
import { userLoadJobsDataGuard } from "./route-guards/user-load-jobs-data.guard";
import { UserProfileComponent } from "./components/user-profile/user-profile.component";
import { userLoadUserDataGuard } from "./route-guards/user-load-user-data.guard";

const routes: Routes = [
    { path: 'user', component:UserHomeComponent, children: [
        { path: '', redirectTo:'dashboard', pathMatch:"full" },
        { path: 'dashboard', component:DashboardComponent, canActivate:[userLoadUserDataGuard,userLoadJobsDataGuard] },
        { path: 'profile/:id', component:UserProfileComponent, canActivate:[userLoadUserDataGuard] },
        { path: 'jobs', component:JobListComponent, canActivate:[userLoadJobsDataGuard] },
        { path: 'job/:id', component:JobDetailedViewComponent, canActivate:[userLoadUserDataGuard] },
    ], canActivate:[userAuthGuard]}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class userRouteModule { }