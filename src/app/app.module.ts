import { TimesheetAddTrasfV2Component } from './modules/timesheet/components/timesheet-add-trasf-v2/timesheet-add-trasf-v2.component';
import { AuthenticationService } from '@app/services/authentication.service';
import { NewPasswordComponent } from './shared/new-password/new-password.component';
import { TimesheetAddTrasfComponent } from './modules/timesheet/components/timesheet-add-trasf/timesheet-add-trasf.component';
import { AddInternalactivityComponent } from './modules/user-admin/add-internalactivity/add-internalactivity.component';
import { MY_DATE_FORMATS } from '@app/shared/my-date-formats';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter as DateAdapterIT , MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
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
import { ToastrModule } from 'ngx-toastr';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { UserAdminCreationComponent } from './modules/user-admin/user-admin-creation/user-admin-creation.component';
import { AuthInterceptor } from './_helper/expired.interceptor';
import { Router } from '@angular/router';
import { AddActivityComponent } from './modules/user-admin/add-activity/add-activity.component';
import { AddCustomerOfficeComponent } from './modules/customers/components/add-customer-office/add-customer-office.component';
import { TimesheetAddEventComponent } from './modules/timesheet/components/timesheet-add-event/timesheet-add-event.component';
import { TimesheetTrasferteModalComponent } from './modules/timesheet/components/timesheet-trasferte-modal/timesheet-trasferte-modal.component';
import { LoaderComponent } from './component/loader/loader.component';
import { LoaderInterceptor } from './_helper/loader.interceptor';
import { appInitializer } from './_helper/app.initializer';



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
    LoaderComponent,


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

    ToastrModule.forRoot(), // ToastrModule added

    SharedModule,
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
    AddUserDialogComponent,
    AddOfficeDialogComponent,
    AddActivityComponent,
    AddInternalactivityComponent,
    UserAdminCreationComponent,
    AddCustomerOfficeComponent,
    TimesheetAddEventComponent,
    TimesheetTrasferteModalComponent,
    TimesheetAddTrasfComponent,
    NewPasswordComponent,
    TimesheetAddTrasfV2Component
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AuthenticationService] },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },

    {provide: MAT_DATE_LOCALE, useValue: 'it-IT' },

  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
