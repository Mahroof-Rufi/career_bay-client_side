import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProfileComponent } from "./components/profile/profile.component";
import { employerAuthGuard } from "./route-guards/employer-auth.guard";
import { JobComponent } from "./components/job/job.component";
import { MainComponentComponent } from "./components/main-component/main-component.component";
import { loadEmployerDataGuard } from "./route-guards/load-employer-data.guard";
import { loadEmployerJobsGuard } from "./route-guards/load-employer-jobs.guard";
import { UnderReviewApplicantsComponent } from "./components/under-review-applicants/under-review-applicants.component";
import { loadJobApplicantsGuard } from "./route-guards/load-job-applicants.guard";
const routes: Routes = [
    { path: 'employer', component:MainComponentComponent, children:[
        { path:'', redirectTo:'profile', pathMatch:'full' },
        { path: 'profile', component:ProfileComponent, canActivate:[loadEmployerDataGuard] },
        { path: 'jobs', component:JobComponent, canActivate:[loadEmployerJobsGuard] },
        { path: 'job/applicants/:job_id', component:UnderReviewApplicantsComponent, canActivate:[loadEmployerDataGuard,loadJobApplicantsGuard] }
    ] , canActivate:[employerAuthGuard,loadEmployerJobsGuard]}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class companyRouteModule { }