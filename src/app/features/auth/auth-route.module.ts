import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { dialogueOpenGuard } from "./route-guards/dialogue-open.guard";
import { userLoginComponent } from "./components/user-login/user-login.component";
import { UserSignUpComponent } from "./components/user-sign-up/user-sign-up.component";
import { CompanyLoginComponent } from "./components/company-login/company-login.component";
import { CompanySignUpComponent } from "./components/company-sign-up/company-sign-up.component";
import { AdminLoginComponent } from "./components/admin-login/admin-login.component";
import { dialogueCloseGuard } from "./route-guards/dialogue-close.guard";
import { userTokenCheckGuard } from "./route-guards/user-token-check.guard";
import { employerTokenCheckGuard } from "./route-guards/employer-token-check.guard";
import { adminTokenCheckGuard } from "./route-guards/admin-token-check.guard";

const routes: Routes = [
    { path: 'auth' , children: [
        { path: 'user', children:[
            { path: 'login', component: userLoginComponent, },
            { path: 'register', component: UserSignUpComponent,  },
        ],canActivateChild:[userTokenCheckGuard] },
        { path: 'employer', children: [
            { path: 'login', component:CompanyLoginComponent },
            { path: 'register', component:CompanySignUpComponent }
        ],canActivateChild:[employerTokenCheckGuard] },
    ], canActivate:[dialogueOpenGuard], canDeactivate:[dialogueCloseGuard]},
    { path: 'admin', children: [
        { path: 'login', component: AdminLoginComponent, canActivate:[adminTokenCheckGuard] }
    ] }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class authRouteModule { }