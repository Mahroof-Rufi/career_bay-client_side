import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProfileComponent } from "./components/profile/profile.component";
import { employerAuthGuard } from "./route-guards/employer-auth.guard";
import { JobComponent } from "./components/job/job.component";
import { MainComponentComponent } from "./components/main-component/main-component.component";
import { loadEmployerDataGuard } from "./route-guards/load-employer-data.guard";
import { loadEmployerJobsGuard } from "./route-guards/load-employer-jobs.guard";
import { UnderReviewApplicantsComponent } from "./components/under-review-applicants/under-review-applicants.component";
import { CompanyPostsComponentComponent } from "./components/company-posts-component/company-posts-component.component";
import { loadEmployerPostsGuard } from "./route-guards/load-employer-posts.guard";
const routes: Routes = [
    { path: '', component:MainComponentComponent, children:[
        { path:'', redirectTo:'profile', pathMatch:'full' },
        { path: 'profile', component:ProfileComponent },
        { path: 'jobs', component:JobComponent },
        { path: 'job/applicants/:job_id', component:UnderReviewApplicantsComponent },
        { path: 'posts', component:CompanyPostsComponentComponent },
    ] }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class companyRouteModule { }