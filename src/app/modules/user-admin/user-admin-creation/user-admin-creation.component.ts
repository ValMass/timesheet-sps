import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
  //profileForm: FormGroup;
  datepicker: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: string,
              private fb: FormBuilder,
              private dialogRef: MatDialogRef<UserAdminCreationComponent>,
              private officesService: OfficesService
              ) { }

  ngOnInit(): void {
    //this.profileForm = this.buildProfileForm();
    this.datepicker= new Date();
    let tmp = new Date();
    let newyear = tmp.getFullYear() - 18;
    let date = new Date(newyear, tmp.getMonth(), 1);
    //this.profileForm.patchValue({birthdate: date});
    this.officesService.listAllOffices().subscribe(res => {
      this.officesList = res.data;
    });
  }

  //get f() { return this.profileForm.controls; }

  submit(form : NgForm) {
    const obj = {...form.value, 'birthdate': this.datepicker };
    this.dialogRef.close({ data: obj });
    //console.log('obj:', obj);
    //console.log("datepicker" ,this.datepicker)
  }

  buildProfileForm() {
    const profileForm = this.fb.group({
      username: ['', [ Validators.required]],
      password: ['', [ Validators.required]],
      email: ['', [ Validators.required] ],
      userscreationdate: [''/*, [ Validators.required]*/],
      role: [''/*, [ Validators.required]*/],
      regnuminps: ['', [ Validators.required]],
      regnumsps: ['', [ Validators.required]],
      isadmin: [''],
      name: [''],
      surname: [''],
      address: ['', [ Validators.required]],
      birthdate : [''],
      phonenumber1: ['', [ Validators.required]],
      phonenumber2: [''],
      sededilavoro: [''],
      ral: [''],
      rimborsostimato: [''],
      pagamensile: [''],
      buonipastobool: [''],
    });
    return profileForm;
  }

  close() {
    this.dialogRef.close();
  }

}

