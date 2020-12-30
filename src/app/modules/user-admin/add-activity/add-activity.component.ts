import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css']
})
export class AddActivityComponent implements OnInit {
  public customerlist: any[] = [];
  public activityForm: FormGroup;
  public submitted = false;
  public activitiesType : any;
  public type : any ;
  
 

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef < AddActivityComponent >,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.activityForm = this.formBuilder.group({
      activityName: ['', [Validators.required]],
      customerId:   ['', [Validators.required]],
      defaultactivitytype: [],
    });
    this.customerlist = this.data.customerList;
    this.activitiesType = this.data.activitiesType;
  }

  submit() {
    
    /*console.log('is invalid ?: ' + this.activityForm.invalid);
    if (this.activityForm.invalid) {
      console.log('invalid form is: ' + JSON.stringify(this.activityForm.value) );
      return;
    }
    console.log('valid form is: ' + JSON.stringify(this.activityForm.value) );*/
    this.dialogRef.close({ data: this.activityForm.value });
  }

  close() {
    this.dialogRef.close();
  }

  assignTypeActivity(evento){
    let customer  = this.customerlist.find(x => x.id === evento);
    this.type = customer.defaultactivitytype;
    this.activityForm.value.defaultactivitytype= this.type;
  }
}
