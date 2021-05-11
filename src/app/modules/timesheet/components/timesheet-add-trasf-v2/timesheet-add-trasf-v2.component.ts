import { TimesheetAddEventComponent } from "./../timesheet-add-event/timesheet-add-event.component";
import { TimesheethttpService } from "./../../services/timesheethttp.service";
import { TimesheetaddtrasfService } from "./../../services/timesheetaddtrasf.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: "app-timesheet-add-trasf-v2",
  templateUrl: "./timesheet-add-trasf-v2.component.html",
  styleUrls: ["./timesheet-add-trasf-v2.component.css"],
})
export class TimesheetAddTrasfV2Component implements OnInit {
  profileForm: FormGroup;
  destinationlist : any;
  submitted : boolean;
  timesheetId: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<TimesheetAddEventComponent>,
    private timesheetaddtrasfService: TimesheetaddtrasfService,
    private timesheetService: TimesheethttpService,
    private formBuilder: FormBuilder,

  ) {}

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      destTrasf: ['', [Validators.required]],
      eventDate: [this.data.date, [Validators.required]],
    });
    this.getPossibleDestination("0", this.data.timesheet.userid)
    this.timesheetId = this.data.timesheet.id; 
  }

  getPossibleDestination(customerId, userId) {
    this.timesheetaddtrasfService.getPossibleDestination(customerId, userId).subscribe(
      res => {
        this.destinationlist = res["data"]
      }
    );
  }

  submit() {
    this.submitted = true
    if(this.profileForm.value.destTrasf != null && this.profileForm.value.destTrasf != "") {
      this.dialogRef.close({
        timesheetId: this.timesheetId,
        trasferta: this.profileForm.value.destTrasf,
        data: this.profileForm.value.eventDate
      });
    }
    
  }

  close() {
    this.dialogRef.close({ data: "close" });
  }
}
