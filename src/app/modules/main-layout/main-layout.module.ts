import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainLayoutRoutingModule } from './main-layout-routing.module';
import { MainLayoutComponent } from './main-layout.component';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';


@NgModule({
  declarations: [
    MainLayoutComponent
  ],
  imports: [
    CommonModule,
    NavbarComponent,
    MainLayoutRoutingModule
  ]
})
export class MainLayoutModule { }
