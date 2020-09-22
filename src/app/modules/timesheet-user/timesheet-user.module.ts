import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimesheetUserRoutingModule } from './timesheet-user-routing.module';
import { TimesheetEditComponent } from './timesheet-edit/timesheet-edit.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { AddEventModalUserComponent } from './add-event-modal/add-event-modal.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '@app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatCheckboxModule } from '@angular/material/checkbox';


@NgModule({
  declarations: [TimesheetEditComponent, AddEventModalUserComponent],
  imports: [
    CommonModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    TimesheetUserRoutingModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    NgSelectModule,
    MatCheckboxModule,

  ],
  entryComponents: [
    AddEventModalUserComponent,
  ],
})
export class TimesheetUserModule { }
