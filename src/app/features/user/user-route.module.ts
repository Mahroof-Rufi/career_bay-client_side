import { RouterModule, Routes } from "@angular/router";
import { UserHomeComponent } from "./components/user-home/user-home.component";
import { NgModule } from "@angular/core";
import { userAuthGuard } from "./route-guards/user-auth.guard";
import { DashboardComponent } from "./components/dashboard/dashboard.component";

const routes: Routes = [
    { path: 'user', component:UserHomeComponent, children: [
        { path: '', redirectTo:'dashboard', pathMatch:"full" },
        { path: 'dashboard', component:DashboardComponent },
        
    ], canActivate:[userAuthGuard]}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class userRouteModule { }