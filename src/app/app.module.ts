import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { TimesheetPageComponent } from './component/timesheet-page/timesheet-page.component';
import { TimesheetComponentComponent } from './component/timesheet-component/timesheet-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideBarComponent } from './component/side-bar/side-bar.component';
import { UserprofilePageComponent } from './component/userprofile-page/userprofile-page.component';
import { UserprofileFormComponent } from './component/userprofile-form/userprofile-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserlistPageComponent } from './component/userlist-page/userlist-page.component';
import { UserlistListComponent } from './component/userlist-list/userlist-list.component';
import { AddEventModalComponent } from './component/modal/add-event-modal/add-event-modal.component';
import { NgbModalModule, NgbModule, NgbDateAdapter, NgbDateNativeUTCAdapter } from '@ng-bootstrap/ng-bootstrap';
import { LoginPageComponent } from './component/login-page/login-page.component';
import { ConfirmationDialogComponent } from './component/modal/confirmation-dialog/confirmation-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    TimesheetPageComponent,
    TimesheetComponentComponent,
    SideBarComponent,
    UserprofilePageComponent,
    UserprofileFormComponent,
    UserlistPageComponent,
    UserlistListComponent,
    AddEventModalComponent,
    LoginPageComponent,
    ConfirmationDialogComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModalModule,
    NgbModule,



  ],
  entryComponents: [AddEventModalComponent],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeUTCAdapter}],
  bootstrap: [AppComponent]
})
export class AppModule { }
