import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { NgxMaskModule } from 'ngx-mask';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatPaginatorModule} from '@angular/material/paginator';
import { UserDetailsComponent } from './user-details/user-details.component';
import { SearchFirebasePipe } from 'src/app/shared/pipes/search-firebase.pipe';
import { SortAlphabeticalPipe } from 'src/app/shared/pipes/sort-alphabetical.pipe';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    UsersComponent,
    UserDetailsComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    NgxSkeletonLoaderModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatIconModule,
    SearchFirebasePipe,
    FormsModule,
    SortAlphabeticalPipe,
    RouterModule,
    NgxMaskModule.forRoot(),
    UsersRoutingModule
  ]
})
export class UsersModule { }
