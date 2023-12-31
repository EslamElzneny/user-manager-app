import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout.component';

const routes: Routes = [
  {path:'',component:MainLayoutComponent,children:[
    {path:'',redirectTo:'users-management',pathMatch:'full'},
    {path:'users-management',loadChildren:()=>import('../users/users.module').then((m)=>m.UsersModule)},
    {path:'my-profile',loadChildren:()=>import('../profile/profile.module').then((m)=>m.ProfileModule)}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainLayoutRoutingModule { }
