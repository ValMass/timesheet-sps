import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserAnagRoutingModule } from './user-anag-routing.module';
import { UserAnagComponent } from './user-anag.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [UserAnagComponent],
  imports: [
    CommonModule,
    UserAnagRoutingModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatCheckboxModule,

  ]
})
export class UserAnagModule { }
