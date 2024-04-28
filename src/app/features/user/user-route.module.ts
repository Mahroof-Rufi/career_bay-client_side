import { RouterModule, Routes } from "@angular/router";
import { UserHomeComponent } from "./components/user-home/user-home.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    { path: 'user', pathMatch:"full", redirectTo: '/user/dashboard' },
    { path: 'user', children: [
        { path: 'dashboard', component: UserHomeComponent }
    ]}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class userRouteModule { }