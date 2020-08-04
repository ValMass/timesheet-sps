import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-contract-dialog',
  templateUrl: './add-contract-dialog.component.html',
  styleUrls: ['./add-contract-dialog.component.css']
})
export class AddContractDialogComponent implements OnInit {

  public submitted: boolean = false;

  contractForm = new FormGroup({
    contracttype: new FormControl('', [ Validators.required, ] ),
    title: new FormControl('', [ Validators.required, ] ),
    level: new FormControl('', [ Validators.required, ] ),
    ccnl: new FormControl('', [ Validators.required, ] ),
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: string,
              private dialogRef: MatDialogRef<AddContractDialogComponent>,
              ) { }

  ngOnInit(): void {

  }
  get f() { return this.contractForm.controls; }

  submit() {
    if ( this.contractForm.invalid ) {
      console.log(this.submitted && this.f.nome.errors );
      return false;
    }
    this.dialogRef.close({ data: this.contractForm.value });

  }
}

