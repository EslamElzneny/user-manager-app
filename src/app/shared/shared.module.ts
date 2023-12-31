import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { FormErrorsComponent } from './components/form-errors/form-errors.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NavbarComponent } from './components/navbar/navbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    FormErrorsComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatButtonModule,
    SharedRoutingModule
  ],
  exports:[
    FormErrorsComponent,
    NavbarComponent
  ]
})
export class SharedModule { }
