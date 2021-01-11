import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimesheetRoutingModule } from './timesheet-routing.module';
import { TimesheetEditComponent } from './components/timesheet-edit/timesheet-edit.component';
import { TimesheetAddEventComponent } from './components/timesheet-add-event/timesheet-add-event.component';
import { DateAdapter, CalendarModule } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '@app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TimesheetTrasferteModalComponent } from './components/timesheet-trasferte-modal/timesheet-trasferte-modal.component';
import { TimesheetAddTrasfComponent } from './components/timesheet-add-trasf/timesheet-add-trasf.component';




@NgModule({
  declarations: [TimesheetEditComponent, TimesheetAddEventComponent, TimesheetTrasferteModalComponent, TimesheetAddTrasfComponent,],
  imports: [
    CommonModule,
    TimesheetRoutingModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    HttpClientModule,
    SharedModule,
    MatDatepickerModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    NgSelectModule,
  ],

})
export class TimesheetModule { }
