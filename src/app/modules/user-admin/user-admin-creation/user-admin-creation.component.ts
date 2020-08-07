import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddUserDialogComponent } from '@app/component/modal/add-user-dialog/add-user-dialog.component';

@Component({
  templateUrl: './user-admin-creation.component.html',
  styleUrls: ['./user-admin-creation.component.css']
})
export class UserAdminCreationComponent implements OnInit {
  public submitted: boolean = false;

  profileForm = new FormGroup({

    username: new FormControl('', [ Validators.required, ] ),
    password: new FormControl('', [ Validators.required, ] ),
    email: new FormControl('', [ Validators.required, ] ),
    userscreationdate: new FormControl('', [ Validators.required, ] ),
    role: new FormControl('', [ Validators.required, ] ),
    regnuminps: new FormControl('', [ Validators.required, ] ),
    regnumsps: new FormControl('', [ Validators.required, ] ),
    isadmin: new FormControl(''),
  });



  constructor(@Inject(MAT_DIALOG_DATA) public data: string,
              private dialogRef: MatDialogRef<AddUserDialogComponent>,
              ) { }

  ngOnInit(): void {

  }
  get f() { return this.profileForm.controls; }

  submit() {
    this.dialogRef.close({ data: this.profileForm.value });

  }
}

