import { RouterModule, Routes } from "@angular/router";
import { UserHomeComponent } from "./components/user-home/user-home.component";
import { NgModule } from "@angular/core";
import { userAuthGuard } from "./route-guards/user-auth.guard";

const routes: Routes = [
    { path: 'user', children: [
        { path: 'dashboard', pathMatch:"full" ,component: UserHomeComponent }
    ], canActivate:[userAuthGuard]}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class userRouteModule { }