import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { adminAuthGuard } from "./route-guards/admin-auth.guard";
import { AdminLoginComponent } from "./components/admin-login/admin-login.component";
const routes: Routes = [
    { path: 'admin', children:[
        { path: 'login', component: AdminLoginComponent },
        { path: 'dashboard', component: DashboardComponent, canActivate:[adminAuthGuard]  },
    ]}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class adminRouteModule { }