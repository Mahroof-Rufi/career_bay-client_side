import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProfileComponent } from "./components/profile/profile.component";
import { employerAuthGuard } from "./route-guards/employer-auth.guard";
import { JobComponent } from "./components/job/job.component";
const routes: Routes = [
    { path: 'employer', children:[
        { path: 'dashboard', component:ProfileComponent },
        { path: 'jobs', component:JobComponent }
    ] , canActivate:[employerAuthGuard]}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class companyRouteModule { }