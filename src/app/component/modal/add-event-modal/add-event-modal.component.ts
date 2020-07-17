import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { NgbActiveModal , NgbDatepicker, NgbDate, NgbModule  } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-event-modal',
  templateUrl: './add-event-modal.component.html',
  styleUrls: ['./add-event-modal.component.css']
})
export class AddEventModalComponent implements OnInit {

  minDate = {year: 2020, month: 7, day: 1};
  maxDate = {year: 2020, month: 7, day: 30};

  name: string;
  value: number;
  submitted = false;

  profileForm = new FormGroup({
    numeroOre: new FormControl('', [ Validators.required, ]),
    eventDate: new FormControl('', [ Validators.required, ] ),
    contractCode: new FormControl('', [ Validators.required, ])
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: string,
  private dialogRef: MatDialogRef<AddEventModalComponent>) { }

  ngOnInit() {
  }

  get f() { return this.profileForm.controls; }

  submit() {
    this.dialogRef.close({ data: this.profileForm.value });
    /*this.submitted = true;
    console.log(this.profileForm.value.eventDate);
    if (this.profileForm.invalid) {

      return;
    }
    // console.warn(this.profileForm.value);
    this.activeModal.close(this.profileForm.value);*/
  }
  valueChanged(e) {
    this.value = e.target.value;
  }
}
