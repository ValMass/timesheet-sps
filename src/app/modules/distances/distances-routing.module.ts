import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DistancesComponent } from './distances.component';

const routes: Routes = [
  { path: '', component: DistancesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DistancesRoutingModule { }
