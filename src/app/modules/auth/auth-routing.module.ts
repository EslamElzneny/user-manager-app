import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { unauthUserGuard } from 'src/app/core/guards/unauth-user.guard';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

const routes: Routes = [
  {path:'',redirectTo:'sign-in',pathMatch:'full'},
  {
    path:'sign-in',
    component:SignInComponent,
    pathMatch:'full',
    canActivate:[unauthUserGuard]
  },
  {
    path:'sign-up',
    component:SignUpComponent,
    pathMatch:'full',
    canActivate:[unauthUserGuard]
  },
  {
    path:'verify-email',
    component:VerifyEmailComponent,
    pathMatch:'full',
    canActivate:[unauthUserGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
