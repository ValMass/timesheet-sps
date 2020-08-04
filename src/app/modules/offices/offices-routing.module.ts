import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OfficesComponent } from './offices.component';
import { OfficeDetailComponent } from './office-detail/office-detail.component';

const routes: Routes = [
  {
    path: '',
    component: OfficeDetailComponent
  },
  {
    path: 'office-detail',
    component: OfficeDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfficesRoutingModule { }
