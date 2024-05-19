import { verifyUserApplicationGuard } from './route-guards/verify-user-application.guard';
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
import { AppliedJobsComponent } from "./components/applied-jobs/applied-jobs.component";
import { loadAppliedJobsGuard } from './route-guards/load-applied-jobs.guard';
import { userLoadPostsGuard } from './route-guards/user-load-posts.guard';

const routes: Routes = [
    { path: 'user', component:UserHomeComponent, children: [
        { path: '', redirectTo:'dashboard', pathMatch:"full" },
        { path: 'dashboard', component:DashboardComponent, canActivate:[userLoadUserDataGuard,userLoadJobsDataGuard,userLoadPostsGuard] },
        { path: 'profile/:id', component:UserProfileComponent, canActivate:[userLoadUserDataGuard] },
        { path: 'jobs', component:JobListComponent, canActivate:[userLoadJobsDataGuard] },
        { path: 'job/:id', component:JobDetailedViewComponent, canActivate:[verifyUserApplicationGuard,userLoadUserDataGuard,userLoadJobsDataGuard] },
        { path: 'applied-jobs/:id', component:AppliedJobsComponent, canActivate:[userLoadUserDataGuard,loadAppliedJobsGuard] }
    ], canActivate:[userAuthGuard]}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class userRouteModule { }