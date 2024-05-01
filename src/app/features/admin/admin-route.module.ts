import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { adminAuthGuard } from "./route-guards/admin-auth.guard";

const routes: Routes = [
    { path: 'admin', children:[
        { path: 'dashboard', component: DashboardComponent },
    ],canActivate:[adminAuthGuard] }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class adminRouteModule { }