import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageUserRoutingModule } from './home-page-user-routing.module';
import { HomePageUserComponent } from './home-page-user.component';
import { WorkedHourComponent } from './worked-hour/worked-hour.component';



@NgModule({
  declarations: [HomePageUserComponent, WorkedHourComponent],
  imports: [
    CommonModule,
    HomePageUserRoutingModule,

  ]
})
export class HomePageUserModule { }
