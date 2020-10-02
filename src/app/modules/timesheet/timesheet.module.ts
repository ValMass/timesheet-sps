import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimesheetRoutingModule } from './timesheet-routing.module';
import { TimesheetEditComponent } from './components/timesheet-edit/timesheet-edit.component';
import { TimesheetAddEventComponent } from './components/timesheet-add-event/timesheet-add-event.component';
import { DateAdapter, CalendarModule } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '@app/shared/shared.module';



@NgModule({
  declarations: [TimesheetEditComponent, TimesheetAddEventComponent],
  imports: [
    CommonModule,
    TimesheetRoutingModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    HttpClientModule,
    SharedModule,
  ]
})
export class TimesheetModule { }
