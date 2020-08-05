import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserAnagComponent } from './user-anag.component';

const routes: Routes = [{ path: '', component: UserAnagComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAnagRoutingModule { }
