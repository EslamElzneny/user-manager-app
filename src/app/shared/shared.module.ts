import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { FormErrorsComponent } from './components/form-errors/form-errors.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NavbarComponent } from './components/navbar/navbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { DateDisplayFirebasePipe } from './pipes/date-display-firebase.pipe';
import { SearchFirebasePipe } from './pipes/search-firebase.pipe';
import { SortByDatePipe } from './pipes/sort-by-date.pipe';

@NgModule({
  declarations: [
    FormErrorsComponent,
    NavbarComponent,
    DateDisplayFirebasePipe,
    SearchFirebasePipe,
    SortByDatePipe
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    SharedRoutingModule
  ],
  exports:[
    FormErrorsComponent,
    NavbarComponent,
    SearchFirebasePipe,
    SortByDatePipe,
    DateDisplayFirebasePipe
  ],
  providers: [
    DatePipe,
  ]
})
export class SharedModule { }
