import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideBarComponent } from './component/side-bar/side-bar.component';
import { UserprofilePageComponent } from './component/userprofile-page/userprofile-page.component';
import { UserprofileFormComponent } from './component/userprofile-form/userprofile-form.component';



import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserlistListComponent } from './component/userlist-list/userlist-list.component';
import { LoginPageComponent } from './component/login-page/login-page.component';
import { ConfirmationDialogTwoComponent } from './component/modal/confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AddUserDialogComponent } from './component/modal/add-user-dialog/add-user-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { JwtInterceptor } from '@app/_helper/jwt.interceptor';
import { UserDetailComponent } from './component/user-detail/user-detail.component';
import { AddCustomerOfficeDialogComponent } from './component/modal-customer-office/add-dialog/add-dialog.component';
// tslint:disable-next-line: max-line-length
import { ConfirmationDialogComponent } from '@app/component/modal-customer-office/confirmation-dialog/confirmation-dialog.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { AddOfficeDialogComponent } from './modules/offices/modals/add-office-dialog/add-office-dialog.component';
import { TimesheetModule } from './modules/timesheet/timesheet.module';
import { AddEventModalComponent } from './modules/timesheet/add-event-modal/add-event-modal.component';

import { ToastrModule } from 'ngx-toastr';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { UserAdminCreationComponent } from './modules/user-admin/user-admin-creation/user-admin-creation.component';
import { AuthInterceptor } from './_helper/expired.interceptor';
import { Router } from '@angular/router';
import { TimesheetUserModule } from './modules/timesheet-user/timesheet-user.module';
import { AddEventModalUserComponent } from './modules/timesheet-user/add-event-modal/add-event-modal.component';



@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    UserprofilePageComponent,
    UserprofileFormComponent,
    UserlistListComponent,
    LoginPageComponent,
    ConfirmationDialogTwoComponent,
    AddUserDialogComponent,
    ConfirmationDialogComponent,
    UserDetailComponent,
    AddCustomerOfficeDialogComponent,
    ConfirmationDialogComponent,
    NotFoundComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatExpansionModule,
    // My Module
    TimesheetModule,
    ToastrModule.forRoot(),
    TimesheetUserModule, // ToastrModule added


  ],
  exports: [
    SideBarComponent,
    MatDialogModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
  ],
  entryComponents: [
    AddEventModalComponent,
    AddEventModalUserComponent,
    AddUserDialogComponent,
    AddOfficeDialogComponent,
    UserAdminCreationComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true

    },
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
