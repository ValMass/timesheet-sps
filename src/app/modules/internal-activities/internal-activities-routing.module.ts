import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InternalActivitiesListComponent } from './internal-activities-list/internal-activities-list.component';

import { InternalActivitiesComponent } from './internal-activities.component';

const routes: Routes = [
  {
    path: '', component: InternalActivitiesComponent
  },
  /*{
    path: ':id',
    component: InternalActivitiesListComponent,
    //canActivate: [TimesheetGuardGuard,]
  },*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InternalActivitiesRoutingModule { }
