import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { constructor } from 'moment';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css']
})
export class AddActivityComponent implements OnInit {
  public customerlist: any[] = [];
  public activityForm: FormGroup;
constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef < AddActivityComponent >,
    private formBuilder: FormBuilder) { }

ngOnInit(): void {
  this.activityForm = this.formBuilder.group({
    activityName: ['', [Validators.required]],
    customerName: ['', [Validators.required]],
    customerId:   ['', [Validators.required]],
  });
  this.customerlist = this.data.customerList;
  console.log(this.data.customerList);
}

submit(){}
}
