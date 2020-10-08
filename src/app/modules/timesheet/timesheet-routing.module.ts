import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeGuard } from '@app/_helper/home.guard';
import { TimesheetEditComponent } from './components/timesheet-edit/timesheet-edit.component';
import { TimesheetGuardGuard } from './guard/timesheet-guard.guard';
import { TimesheethttpService } from './services/timesheethttp.service';

const routes: Routes = [
  {
    path: '',
    component: TimesheetEditComponent,
  },
  {
    path: ':id',
    component: TimesheetEditComponent,
    canActivate: [TimesheetGuardGuard,]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TimesheetRoutingModule {}
