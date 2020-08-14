import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageUserRoutingModule } from './home-page-user-routing.module';
import { HomePageUserComponent } from './home-page-user.component';


@NgModule({
  declarations: [HomePageUserComponent],
  imports: [
    CommonModule,
    HomePageUserRoutingModule
  ]
})
export class HomePageUserModule { }
