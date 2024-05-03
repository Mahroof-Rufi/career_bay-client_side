import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { employerAuthGuard } from "./route-guards/employer-auth.guard";
const routes: Routes = [
    { path: 'employer', children:[
        { path: 'dashboard', component:DashboardComponent },
    ] , canActivate:[employerAuthGuard]}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class companyRouteModule { }