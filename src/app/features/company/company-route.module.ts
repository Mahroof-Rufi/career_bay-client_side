import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProfileComponent } from "./components/home/profile/profile.component";
import { JobComponent } from "./components/home/job/job.component";
import { MainComponentComponent } from "./components/home/home.component";
import { UnderReviewApplicantsComponent } from "./components/home/job/under-review-applicants/under-review-applicants.component";
import { CompanyPostsComponentComponent } from "./components/home/company-posts-component/company-posts-component.component";
import { InboxComponent } from "../../shared/components/inbox/inbox.component";
import { JobDetailedViewComponent } from "../../shared/components/job-detailed-view/job-detailed-view.component";
const routes: Routes = [
    { path: '', component:MainComponentComponent, children:[
        { path:'', redirectTo:'profile', pathMatch:'full' },
        { path: 'profile', component:ProfileComponent },
        { path: 'jobs', component:JobComponent },
        { path: 'job/applicants/:job_id', component:UnderReviewApplicantsComponent },
        { path: 'job/:context/:id', component:JobDetailedViewComponent },
        { path: 'posts', component:CompanyPostsComponentComponent },
        { path: 'inbox/:context', component:InboxComponent },
        { path: 'inbox/:context/:id', component:InboxComponent },
    ] }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class companyRouteModule { }