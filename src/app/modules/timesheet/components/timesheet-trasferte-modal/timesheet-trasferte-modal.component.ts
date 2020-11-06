import { NgForm } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TimesheethttpService } from '../../services/timesheethttp.service';

@Component({
  templateUrl: './timesheet-trasferte-modal.component.html',
  styleUrls: ['./timesheet-trasferte-modal.component.css']
})
export class TimesheetTrasferteModalComponent implements OnInit {
  trasferteList: any[] = [];
  trasferteListTemp: any[] = [];

  acivalue = 0.54;
  diariavalue = 20;

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
      private dialogRef: MatDialogRef<TimesheetTrasferteModalComponent>,
      private timesheetService: TimesheethttpService,
      ) { }

  async ngOnInit(): Promise<void> {
    const id = 2;

    /*this.timesheetService.getUserData(id).subscribe(
      res => {
        console.log("userdataResult -> ", res.data);
      }
    );*/
    let res = null;
    try {

      res = await this.timesheetService.getUserData(id).toPromise();

    } catch (e) {
      console.log(e);
    }

    console.log(this.data.trasferta);
    this.trasferteList = this.data.trasferta ;
    this.trasferteListTemp = this.trasferteList.map( x => {
      console.log(x);
      x["calcoli"] = (x.matr.distance * 2 * this.acivalue) + this.diariavalue;
      return x;
    });

    /*this.timesheetService.calcTrasferte("1", "2000", customeridList).subscribe(
      (result) => {
      console.log("risultati -> ",result);
      this.trasferteList = result.data;
      console.log("trasferteList -> ",this.trasferteList);
    },
    error => {
      console.log(error);
    });*/

  }

  ricalcolaTrasferte(paramform: NgForm) {
    console.log(paramform.value.acivalue);
    console.log(this.data.timesheet);
    this.timesheetService.calcTrasferte(this.data.timesheet.id, paramform.value.acivalue, paramform.value.diaria).subscribe(
      res => {
        this.trasferteList = JSON.parse(res.data);
        this.trasferteListTemp = this.trasferteList.map( x => {
          console.log(x);
          x["calcoli"] = (x.matr.distance * 2 * paramform.value.acivalue) + paramform.value.diaria;
          return x;
        });
      },
      error => {

      }
    );
  }

  closeModal() {
    this.dialogRef.close({ });
  }

  saveList() {
    this.dialogRef.close({ data: this.trasferteList });
  }

  trackById(index: number, user: any): number {
    return user.id;
  }
}
