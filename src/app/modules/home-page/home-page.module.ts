import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { UserListComponent } from './widget/user-list/user-list.component';
import { CustListComponent } from './widget/cust-list/cust-list.component';



@NgModule({
  declarations: [
    HomePageComponent,
    UserListComponent,
    CustListComponent

  ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    MatGridListModule,

  ]
})
export class HomePageModule { }
