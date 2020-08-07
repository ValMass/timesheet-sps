import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';

import { UserAdminRoutingModule } from './user-admin-routing.module';
import { UserAdminComponent } from './user-admin.component';
import { SharedModule } from '../../shared/shared.module';
import { UserAdminListComponent } from './user-admin-list/user-admin-list.component';
import { UserAdminDetailComponent } from './user-admin-detail/user-admin-detail.component';
import { MatExpansionModule } from '@angular/material/expansion';


@NgModule({
  declarations: [UserAdminComponent, UserAdminListComponent, UserAdminDetailComponent],
  imports: [
    CommonModule,
    UserAdminRoutingModule,
    SharedModule,
    MatExpansionModule,
    NgSelectModule,
  ]
})
export class UserAdminModule { }
