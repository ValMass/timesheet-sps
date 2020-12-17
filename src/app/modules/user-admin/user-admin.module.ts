import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { UserAdminRoutingModule } from './user-admin-routing.module';
import { UserAdminComponent } from './user-admin.component';
import { SharedModule } from '../../shared/shared.module';
import { UserAdminListComponent } from './user-admin-list/user-admin-list.component';
import { UserAdminDetailComponent } from './user-admin-detail/user-admin-detail.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { UserAdminCreationComponent } from './user-admin-creation/user-admin-creation.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { AddActivityComponent } from './add-activity/add-activity.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AddInternalactivityComponent } from './add-internalactivity/add-internalactivity.component';



@NgModule({
  declarations: [
    UserAdminComponent,
    UserAdminListComponent,
    UserAdminDetailComponent,
    UserAdminCreationComponent,
    AddActivityComponent,
    AddInternalactivityComponent
  ],
  imports: [
    CommonModule,
    UserAdminRoutingModule,
    SharedModule,
    MatExpansionModule,
    MatDatepickerModule,
    NgSelectModule,
    MatCheckboxModule,
  ],
  entryComponents: [
    UserAdminCreationComponent,
  ],

  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'it-IT' },
  ]
})
export class UserAdminModule { }
