import { RouterModule, Routes } from "@angular/router";
import { UserHomeComponent } from "./components/user-home/user-home.component";
import { NgModule } from "@angular/core";
import { userAuthGuard } from "./route-guards/user-auth.guard";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { JobListComponent } from "./components/job-list/job-list.component";
import { JobDetailedViewComponent } from "./components/job-detailed-view/job-detailed-view.component";

const routes: Routes = [
    { path: 'user', component:UserHomeComponent, children: [
        { path: '', redirectTo:'dashboard', pathMatch:"full" },
        { path: 'dashboard', component:DashboardComponent },
        { path: 'jobs', component:JobListComponent },
        { path: 'job/:id', component:JobDetailedViewComponent },
    ], canActivate:[userAuthGuard]}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class userRouteModule { }