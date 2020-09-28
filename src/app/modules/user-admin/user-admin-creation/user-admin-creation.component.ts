import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';

import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { OfficesService } from '../services/offices.service';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};




@Component({
  templateUrl: './user-admin-creation.component.html',
  styleUrls: ['./user-admin-creation.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class UserAdminCreationComponent implements OnInit {
  public submitted: boolean = false;
  public officesList: any[];
  profileForm = new FormGroup({

    username: new FormControl('', [ Validators.required, ] ),
    password: new FormControl('', [ Validators.required, ] ),
    email: new FormControl('', [ Validators.required, ] ),
    userscreationdate: new FormControl('', [ Validators.required, ] ),
    role: new FormControl('', [ Validators.required, ] ),
    regnuminps: new FormControl('', [ Validators.required, ] ),
    regnumsps: new FormControl('', [ Validators.required, ] ),
    isadmin: new FormControl(''),
    name: new FormControl(''),
    surname: new FormControl(''),
    address: new FormControl('', [ Validators.required, ] ),
    birthdate : new FormControl(''),
    phonenumber1: new FormControl('', [ Validators.required, ]),
    phonenumber2: new FormControl(''),
    sededilavoro: new FormControl(''),
  });



  constructor(@Inject(MAT_DIALOG_DATA) public data: string,
              private dialogRef: MatDialogRef<UserAdminCreationComponent>,
              private officesService: OfficesService
              ) { }

  ngOnInit(): void {
    let tmp = new Date();
    let newyear = tmp.getFullYear() - 18;
    let date = new Date(newyear, tmp.getMonth(), 1 );

    this.profileForm.patchValue({birthdate : date});
    this.officesService.listAllOffices().subscribe(
      result => {
        console.log(result.data);
        this.officesList = result.data ;
      },
      error => {
        console.log(error);
      }

    );
  }
  get f() { return this.profileForm.controls; }

  submit() {
    this.dialogRef.close({ data: this.profileForm.value });
  }

  close() {
    this.dialogRef.close();
  }
}

