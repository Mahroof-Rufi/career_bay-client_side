import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home-page/home-page.component';

const routes: Routes = [
  { path:'', redirectTo:'/home', pathMatch:'full' },
  { path:'home', component:HomeComponent },
  { path:'admin', loadChildren: () => import('./features/admin/admin-route.module')
    .then((adminMod) => adminMod.adminRouteModule) 
  },
  { path:'employer', loadChildren: () => import('./features/company/company-route.module')
    .then((empMod) => empMod.companyRouteModule)
  },
  { path:'user', loadChildren: () => import('./features/user/user-route.module')
    .then((userMod) => userMod.userRouteModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
