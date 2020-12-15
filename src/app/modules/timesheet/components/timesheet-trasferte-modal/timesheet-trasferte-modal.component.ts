import { NgForm } from "@angular/forms";
import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TimesheethttpService } from "../../services/timesheethttp.service";
import { Timesheet } from "../../model/timesheet";

@Component({
  templateUrl: "./timesheet-trasferte-modal.component.html",
  styleUrls: ["./timesheet-trasferte-modal.component.css"],
})
export class TimesheetTrasferteModalComponent implements OnInit {
  sededipartenza: any;
  ricalcolaDisabled = false;
  trasferteList: Array<any> = [];
  trasferteListTemp: Array<any> = [];
  trasferteListchanged: Array<any> = [];
  trasferteListTempchanged: Array<any> = [];
  currentTimesheet: any = null;   //TODO verificare che quezsto e' veramente quello che volevo
  currentUserData = null;
  acivalue = 0.54;
  diariavalue = 20;
  rimborsoproposto = '0';
  rimborsodovuto = '0';
  canagedAcivalue = 0;
  canageddiariavalue = 0;
  disableSave = false;
  changed = false;
  quotaStraordinari = '0';
  avanzoRimborso = '0';
  quotaAvanzo = '0';

  newTrasFlag : Boolean = false;

  destinations :any;
  selectDest : any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<TimesheetTrasferteModalComponent>,
    private timesheetService: TimesheethttpService
  ) {}

  async ngOnInit(): Promise<void> {
    //console.log("DATAPADRE" , this.data.timesheet);
    this.currentTimesheet = this.data.timesheet;
    const userId = this.currentTimesheet.userid;
    if ( this.currentTimesheet.state === '4' ){

      this.ricalcolaDisabled = true;
    } else {

      this.ricalcolaDisabled = false;
    }
    this.trasferteList = this.currentTimesheet.trasferte;
    console.log(this.trasferteList);
    let res = null;
    try {
      res = await this.timesheetService.getUserData(userId).toPromise();
    } catch (e) {
      console.log(e);
    }
    this.currentUserData = res["data"][0];
    //console.log("this.currentUserData" , this.currentUserData);
    this.acivalue = +this.currentTimesheet.montlyacivalue;
    this.diariavalue = +this.currentTimesheet.montlydiaria;

    //arrotondo alla seconda cifra decimale
    this.rimborsoproposto = (Number(this.currentTimesheet.rimborsotrasferte)).toFixed(2);
    this.rimborsodovuto = (Number(this.currentTimesheet.rimborsotarget)).toFixed(2);
    this.quotaStraordinari = (Number(this.currentTimesheet.variousexpanse)).toFixed(2);
    this.avanzoRimborso = (Number(this.currentTimesheet.montlyavanzorimborso)).toFixed(2);
    let tmp: any = {};
    try {
      tmp = await this.timesheetService.getUserOffice(this.currentUserData.anad.sededilavoro).toPromise();
    } catch (e) {
      console.log(e);
    }
    this.sededipartenza = tmp['data'];
    console.log(this.sededipartenza);

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

            this.rimborsoproposto = (res.data.rimborsotrasferte).toFixed(2);
            this.rimborsodovuto = (res.data.rimborsotarget).toFixed(2);

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
    if(!this.changed) {
      console.log('not changed');
      console.log(this.trasferteList);
      this.dialogRef.close({
        data: this.trasferteList,
        acivalue: this.acivalue,
        diaria: this.diariavalue,
        rimborsotrasferte: this.rimborsoproposto,
        rimborsotarget: this.rimborsodovuto });
    } else {
      console.log('changed');
      console.log(this.trasferteListchanged);
      this.dialogRef.close({
        data: this.trasferteListchanged,
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
    //console.log("euro x trasf : ", extras);
    const tot = extras * 1 + diaria * 1;
    //console.log("tot : ", tot);

    //arrotondo alla seconda cifra decimale
    return tot.toFixed(2);
  }

  buttonVisibilityControlByStatus(){

  }

  deleteTrasferta(toDelete){
    if(toDelete){
      console.log(this.trasferteListTemp)
      this.trasferteListTemp = this.trasferteListTemp.filter(res => res !== toDelete);
      this.changed = true;
      this.ricalcoloRimborso();
    }
  }

  openAddTrasferta(){
    this.newTrasFlag = !this.newTrasFlag;
    if(this.newTrasFlag){
      this.timesheetService.getPossibleDestination(this.currentTimesheet.id).subscribe(
        res => {
          //console.log(res);
          this.destinations = res["data"];
          //console.log(this.destinations);
        }
      );
    }
  }


  addTrasf(trasferta){
    //console.log("dest" , trasferta.value.selectDest);
    this.trasferteListTemp.push(trasferta.value.selectDest);
    this.trasferteListTemp.map((x) => {
      x["calcoli"] = this.calcolaPesoTrasferte(
        x.matr.distance,
        this.acivalue,
        this.diariavalue,
    )});
    //console.log("dest" , trasferta.value.selectDest);
    this.changed = true;

    this.ricalcoloRimborso();
  }

  ricalcoloRimborso(){
    this.timesheetService.addTrasferta(
      this.data.timesheet.id,
      this.acivalue,
      this.diariavalue,
      this.trasferteListTemp
    ).subscribe(
      res => {
        console.log(res);
        this.rimborsoproposto =  (Number(res.data.rimborso)).toFixed(2);
        console.log( "rimborso ", this.rimborsoproposto);
        this.trasferteListchanged = res.data.trasferte;
      }
    );
  }
}
