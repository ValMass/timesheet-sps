import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { TimesheetComponentComponent } from '@app/component/timesheet-component/timesheet-component.component';
import { UserListComponent } from './widget/user-list/user-list.component';

@NgModule({
  declarations: [
    HomePageComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    MatGridListModule,

  ]
})
export class HomePageModule { }
