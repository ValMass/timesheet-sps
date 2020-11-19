import { NgForm } from "@angular/forms";
import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TimesheethttpService } from "../../services/timesheethttp.service";
import { Timesheet } from "../../model/timesheet";

@Component({
  templateUrl: "./timesheet-trasferte-modal.component.html",
  styleUrls: ["./timesheet-trasferte-modal.component.css"],
})
export class TimesheetTrasferteModalComponent implements OnInit {
  ricalcolaDisabled = false;
  trasferteList: any[] = [];
  trasferteListTemp: any[] = [];
  trasferteListchanged: any[] = [];
  trasferteListTempchanged: any[] = [];
  currentTimesheet: Timesheet = null;
  currentUserData = null;
  acivalue = 0.54;
  diariavalue = 20;
  rimborsoproposto = '0';
  rimborsodovuto = '0';
  canagedAcivalue = 0;
  canageddiariavalue = 0;
  disableSave = false;
  changed = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<TimesheetTrasferteModalComponent>,
    private timesheetService: TimesheethttpService
  ) {}

  async ngOnInit(): Promise<void> {
    this.currentTimesheet = this.data.timesheet;
    const userId = this.currentTimesheet.userid;
    if ( this.currentTimesheet.state === '4' ){
      
      this.ricalcolaDisabled = true;
    } else {

      this.ricalcolaDisabled = false;
    }
    this.trasferteList = JSON.parse(this.currentTimesheet.trasferte);
    console.log(this.trasferteList);
    let res = null;
    try {
      res = await this.timesheetService.getUserData(userId).toPromise();
    } catch (e) {
      console.log(e);
    }
    this.currentUserData = res["data"][0];
    console.log(this.currentUserData);
    this.acivalue = this.currentUserData.ecd.acivalue;
    this.diariavalue = this.currentUserData.ecd.diaria;
    this.rimborsoproposto = this.currentTimesheet.rimborsotrasferte;
    this.rimborsodovuto = this.currentTimesheet.rimborsotarget;
    this.trasferteListTemp = this.trasferteList.map((x) => {
      x["calcoli"] = this.calcolaPesoTrasferte(
        x.matr.distance,
        this.acivalue,
        this.diariavalue
      );
      return x;
    });
  }

  modelChanged(event) {
    if (parseFloat(event) !== 0) {
      console.log("false");
      this.disableSave = false;
    } else {
      console.log("true");
      this.disableSave = true;
    }
  }

  ricalcolaTrasferte(paramform: NgForm) {
    console.log(paramform.value.acivalue);
    console.log(paramform.value.diaria);
    console.log(this.data.timesheet);
    this.changed = true;
    this.timesheetService
      .calcTrasferte(
        this.data.timesheet.id,
        paramform.value.acivalue,
        paramform.value.diaria
      )
      .subscribe(
        (res) => {
          console.log("entro 3");
          if (res.status === "done") {
            this.trasferteListchanged = JSON.parse(res.data.trasferte);
            this.rimborsoproposto = res.data.rimborsotrasferte;
            this.rimborsodovuto = res.data.rimborsotarget;
            this.trasferteListTemp = this.trasferteListchanged.map((x) => {
              x["calcoli"] = this.calcolaPesoTrasferte(
                x.matr.distance,
                paramform.value.acivalue,
                paramform.value.diaria
              );
              this.acivalue = paramform.value.acivalue;
              this.diariavalue = paramform.value.diaria;
              console.log('x["calcoli"]: ', x["calcoli"]);
              return x;
            });
          } else {
            console.log(res.message);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  closeModal() {
    this.dialogRef.close(undefined);
  }

  saveList() {
    if(this.changed) {
      console.log('changed');
      this.dialogRef.close({
        data: this.trasferteList,
        acivalue: this.acivalue,
        diaria: this.diariavalue,
        rimborsotrasferte: this.rimborsoproposto,
        rimborsotarget: this.rimborsodovuto });
    } else {
      console.log('not changed');
      this.dialogRef.close({ data: this.trasferteListchanged,
        acivalue: this.acivalue,
        diaria: this.diariavalue,
        rimborsotrasferte: this.rimborsoproposto,
        rimborsotarget: this.rimborsodovuto});
    }

  }

  trackById(index: number, user: any): number {
    return user.id;
  }

  calcolaPesoTrasferte(distanza, acivalue, diaria) {
    const kanderit = distanza * 2;
    const extras = kanderit * acivalue;
    console.log("euro x trasf : ", extras);
    const tot = extras * 1 + diaria * 1;
    console.log("tot : ", tot);
    return tot;
  }

  buttonVisibilityControlByStatus(){

  }
}
