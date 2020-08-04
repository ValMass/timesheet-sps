import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimesheetRoutingModule } from './timesheet-routing.module';
import { NewTimesheetComponentComponent } from './timesheet-component/timesheet-component.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { AddEventModalComponent } from './add-event-modal/add-event-modal.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    NewTimesheetComponentComponent,
    AddEventModalComponent,
  ],
  imports: [
    CommonModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    TimesheetRoutingModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    HttpClientModule,
  ]
})
export class TimesheetModule { }
