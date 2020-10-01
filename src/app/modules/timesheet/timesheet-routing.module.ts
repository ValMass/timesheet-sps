import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimesheetEditComponent } from './components/timesheet-edit/timesheet-edit.component';
import { TimesheethttpService } from './services/timesheethttp.service';

const routes: Routes = [
    {
        path: ':id',
        component: TimesheetEditComponent,
        resolve: TimesheethttpService,
    },
    {
        path: 'timesheettest',
        component: TimesheetEditComponent,
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimesheetRoutingModule { }
