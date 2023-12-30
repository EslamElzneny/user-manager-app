import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { FormErrorsComponent } from './components/form-errors/form-errors.component';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  declarations: [
    FormErrorsComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    SharedRoutingModule
  ],
  exports:[
    FormErrorsComponent
  ]
})
export class SharedModule { }
