import { RouterModule, Routes } from "@angular/router";
import { UserHomeComponent } from "./components/home/user-home.component";
import { NgModule } from "@angular/core";
import { DashboardComponent } from "./components/home/dashboard/dashboard.component";
import { JobListComponent } from "./components/home/job-list/job-list.component";
import { JobDetailedViewComponent } from "../../shared/components/job-detailed-view/job-detailed-view.component";
import { UserProfileComponent } from "./components/home/user-profile/user-profile.component";
import { AppliedJobsComponent } from "./components/home/applied-jobs/applied-jobs.component";
import { SavedJobsAndPostsComponent } from "./components/home/saved-jobs-and-posts/saved-jobs.component";
import { PostsComponent } from "./components/home/posts/posts.component";
import { NetworksComponent } from "./components/home/networks/networks.component";
import { validateUserTokenGuard } from "./route-guards/validate-user-token.guard";
import { UserProfileCommonViewComponent } from "../../shared/components/user-profile-common-view/user-profile-common-view.component";
import { CompanyProfileCommonViewComponent } from "../../shared/components/company-profile-common-view/company-profile-common-view.component";
import { InboxComponent } from "../../shared/components/inbox/inbox.component";
import { ScheduledInterviewsComponent } from "./components/home/scheduled-interviews/scheduled-interviews.component";
import { LiveMeetComponent } from "../../shared/components/live-meet/live-meet.component";

const routes: Routes = [
    { path: 'user', component:UserHomeComponent, children: [
        { path: '', redirectTo:'dashboard', pathMatch:"full" },
        { path: 'dashboard', component:DashboardComponent, },
        { path: 'profile/:id', component:UserProfileComponent, },
        { path: 'jobs', component:JobListComponent, },
        { path: 'job/:context/:id', component:JobDetailedViewComponent, },
        { path: 'posts', component:PostsComponent },
        { path: 'networks', component:NetworksComponent },
        { path: 'inbox/:context', component:InboxComponent },
        { path: 'inbox/:context/:id', component:InboxComponent },
        { path: 'user-profile/:id', component:UserProfileCommonViewComponent },
        { path: 'employer-profile/:id', component:CompanyProfileCommonViewComponent },
        { path: 'applied-jobs/:id', component:AppliedJobsComponent, },
        { path: 'scheduled-interview/:id', component:ScheduledInterviewsComponent },
        { path: 'saved-jobs/:id', component:SavedJobsAndPostsComponent },
    ], canActivateChild:[validateUserTokenGuard]},
    { path: 'live-meet/:id', component:LiveMeetComponent },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class userRouteModule { }