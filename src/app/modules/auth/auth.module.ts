import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { NgxMaskModule } from 'ngx-mask';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { FormErrorsComponent } from 'src/app/shared/components/form-errors/form-errors.component';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    SignUpComponent,
    SignInComponent,
    VerifyEmailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    RouterModule,
    FormErrorsComponent,
    NgxMaskModule.forRoot(),
    AuthRoutingModule
  ]
})
export class AuthModule { }
