import { RouterModule, Routes } from "@angular/router";
import { UserHomeComponent } from "./components/user-home/user-home.component";
import { NgModule } from "@angular/core";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { JobListComponent } from "./components/job-list/job-list.component";
import { JobDetailedViewComponent } from "./components/job-detailed-view/job-detailed-view.component";
import { UserProfileComponent } from "./components/user-profile/user-profile.component";
import { AppliedJobsComponent } from "./components/applied-jobs/applied-jobs.component";
import { SavedJobsAndPostsComponent } from "./components/saved-jobs-and-posts/saved-jobs.component";
import { SavedPostsComponent } from "./components/saved-posts/saved-posts.component";
import { PostsComponent } from "./components/posts/posts.component";
import { NetworksComponent } from "./components/networks/networks.component";
import { validateUserTokenGuard } from "./route-guards/validate-user-token.guard";
import { UserProfileCommonViewComponent } from "../../shared/components/user-profile-common-view/user-profile-common-view.component";
import { CompanyProfileCommonViewComponent } from "../../shared/components/company-profile-common-view/company-profile-common-view.component";
import { InboxComponent } from "../../shared/components/inbox/inbox.component";

const routes: Routes = [
    { path: 'user', component:UserHomeComponent, children: [
        { path: '', redirectTo:'dashboard', pathMatch:"full" },
        { path: 'dashboard', component:DashboardComponent, },
        { path: 'profile/:id', component:UserProfileComponent, },
        { path: 'jobs', component:JobListComponent, },
        { path: 'job/:id', component:JobDetailedViewComponent, },
        { path: 'posts', component:PostsComponent },
        { path: 'networks', component:NetworksComponent },
        { path: 'inbox', component:InboxComponent },
        { path: 'inbox/:id', component:InboxComponent },
        { path: 'user-profile/:id', component:UserProfileCommonViewComponent },
        { path: 'employer-profile/:id', component:CompanyProfileCommonViewComponent },
        { path: 'applied-jobs/:id', component:AppliedJobsComponent, },
        { path: 'saved-jobs/:id', component:SavedJobsAndPostsComponent },
        { path: 'saved-posts/:id', component:SavedPostsComponent },
    ], canActivateChild:[validateUserTokenGuard]}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class userRouteModule { }