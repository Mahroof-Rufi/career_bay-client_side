import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProfileComponent } from "./components/profile/profile.component";
import { JobComponent } from "./components/job/job.component";
import { MainComponentComponent } from "./components/main-component/main-component.component";
import { UnderReviewApplicantsComponent } from "./components/under-review-applicants/under-review-applicants.component";
import { CompanyPostsComponentComponent } from "./components/company-posts-component/company-posts-component.component";
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