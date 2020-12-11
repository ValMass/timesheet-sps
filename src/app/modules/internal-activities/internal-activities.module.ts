import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InternalActivitiesRoutingModule } from './internal-activities-routing.module';
import { InternalActivitiesComponent } from './internal-activities.component';
import { InternalActivitiesListComponent } from './internal-activities-list/internal-activities-list.component';


@NgModule({
  declarations: [InternalActivitiesComponent, InternalActivitiesListComponent],
  imports: [
    CommonModule,
    InternalActivitiesRoutingModule
  ]
})
export class InternalActivitiesModule { }
