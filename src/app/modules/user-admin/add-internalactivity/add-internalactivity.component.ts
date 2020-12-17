import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-add-internalactivity',
  templateUrl: './add-internalactivity.component.html',
  styleUrls: ['./add-internalactivity.component.css']
})
export class AddInternalactivityComponent implements OnInit {
  public internalActivitiesList : any[] = [];
  public submitted = false;
  public internalAct: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef <AddInternalactivityComponent>,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.internalActivitiesList = this.data.internalActivitiesList;
  }

  submit(f){
    this.dialogRef.close({ data: f.value });
  }

  close() {
    this.dialogRef.close();
  }

  composeStringInternal(internal){
    const res : String = internal.inat.name + " SPS-" + internal.offi.address + ", " + internal.offi.city
    return res
  }
}
