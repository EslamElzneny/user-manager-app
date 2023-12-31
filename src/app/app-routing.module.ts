import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',redirectTo:'auth',pathMatch:'full'},
  {path:'auth',loadChildren:()=>import("./modules/auth/auth.module").then((m)=>m.AuthModule)},
  {path:'dashboard',loadChildren:()=>import("./modules/main-layout/main-layout.module").then((m)=>m.MainLayoutModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
