import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimesheetUserRoutingModule } from './timesheet-user-routing.module';
import { TimesheetEditComponent } from './timesheet-edit/timesheet-edit.component';
import { CalendarModule } from 'angular-calendar';
import { DateAdapter } from '@angular/material/core';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';


@NgModule({
  declarations: [TimesheetEditComponent],
  imports: [
    CommonModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    TimesheetUserRoutingModule
  ]
})
export class TimesheetUserModule { }
