import { MatDatepickerModule } from '@angular/material/datepicker';
import { SharedModule } from '@app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InternalActivitiesRoutingModule } from './internal-activities-routing.module';
import { InternalActivitiesComponent } from './internal-activities.component';
import { InternalActivitiesListComponent } from './internal-activities-list/internal-activities-list.component';
import { InternalActivitiesDetailComponent } from './internal-activities-detail/internal-activities-detail.component';


@NgModule({
  declarations: [InternalActivitiesComponent, InternalActivitiesListComponent, InternalActivitiesDetailComponent],
  imports: [
    CommonModule,
    InternalActivitiesRoutingModule,
    SharedModule,
    MatDatepickerModule,
  ]
})
export class InternalActivitiesModule { }
