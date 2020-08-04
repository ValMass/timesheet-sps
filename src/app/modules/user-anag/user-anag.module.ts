import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserAnagRoutingModule } from './user-anag-routing.module';
import { UserAnagComponent } from './user-anag.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [UserAnagComponent],
  imports: [
    CommonModule,
    UserAnagRoutingModule,
    ReactiveFormsModule
  ]
})
export class UserAnagModule { }
