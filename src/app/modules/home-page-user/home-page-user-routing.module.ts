import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageUserComponent } from './home-page-user.component';

const routes: Routes = [{ path: '', component: HomePageUserComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageUserRoutingModule { }
