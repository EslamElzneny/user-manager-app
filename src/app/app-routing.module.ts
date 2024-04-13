import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authUserGuard } from './core/guards/auth-user.guard';
import { ResolverComponent } from './modules/resolver/resolver.component';
import { metaDataResolver } from './core/guards/meta-data.resolver';

const routes: Routes = [
  {path:'',redirectTo:'auth',pathMatch:'full'},
  {path:'auth',loadChildren:()=>import("./modules/auth/auth.module").then((m)=>m.AuthModule)},
  {
    path:'dashboard',
    loadChildren:()=>import("./modules/main-layout/main-layout.module").then((m)=>m.MainLayoutModule),
    canMatch:[authUserGuard]
  },
  {path:'meta-data',component:ResolverComponent,pathMatch:"full",resolve:{products:metaDataResolver}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
