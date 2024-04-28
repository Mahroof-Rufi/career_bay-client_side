import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { dialogueOpenGuard } from "./route-guards/dialogue-open.guard";
import { userLoginComponent } from "./components/user-login/user-login.component";
import { UserSignUpComponent } from "./components/user-sign-up/user-sign-up.component";

const routes: Routes = [
    { path: 'auth' , children: [
        { path: 'user', children:[
            { path: 'login', component: userLoginComponent, },
            { path: 'sign-up', component: UserSignUpComponent,  },
        ],  canActivate:[dialogueOpenGuard] },
    ]}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class authRouteModule { }