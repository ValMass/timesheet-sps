import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimesheetRoutingModule } from './timesheet-routing.module';
import { TimesheetEditComponent } from './components/timesheet-edit/timesheet-edit.component';
import { TimesheetAddEventComponent } from './components/timesheet-add-event/timesheet-add-event.component';



@NgModule({
  declarations: [TimesheetEditComponent, TimesheetAddEventComponent],
  imports: [
    CommonModule,
    TimesheetRoutingModule,
  ]
})
export class TimesheetModule { }
