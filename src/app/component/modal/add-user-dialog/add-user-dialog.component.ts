import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef , } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.css']
})
export class AddUserDialogComponent implements OnInit {

  public submitted: boolean = false;
  
  profileForm = new FormGroup({

    userId: new FormControl('', [ Validators.required, ]),
    email: new FormControl('', [ Validators.required, ] ),
    password: new FormControl('', [ Validators.required, ]),
    role: new FormControl('', [ Validators.required, ] ),
    regnuminps: new FormControl('', [ Validators.required, ] ),
    regnumsps: new FormControl('', [ Validators.required, ] ),
    nome: new FormControl('', [ Validators.required, ] ),
    cognome: new FormControl('', [ Validators.required, ] ),
    indirizzo: new FormControl('', [ Validators.required, ] ),

  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: string,
              private dialogRef: MatDialogRef<AddUserDialogComponent>) { }

  ngOnInit(): void {

  }
  get f() { return this.profileForm.controls; }

}
