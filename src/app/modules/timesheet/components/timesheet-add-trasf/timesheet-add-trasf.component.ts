import { TimesheethttpService } from './../../services/timesheethttp.service';
import { CalendarEvent } from 'angular-calendar';
import { TimesheetAddEventComponent } from './../timesheet-add-event/timesheet-add-event.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TimesheetaddtrasfService } from '../../services/timesheetaddtrasf.service';

@Component({
  selector: 'app-timesheet-add-trasf',
  templateUrl: './timesheet-add-trasf.component.html',
  styleUrls: ['./timesheet-add-trasf.component.css']
})
export class TimesheetAddTrasfComponent implements OnInit {

  profileForm: FormGroup;
  submitted: boolean = false;
  loadOffice: boolean = true;
  flagShowOff: boolean = true;
  dateObj: any;
  eventsPassed: CalendarEvent[] = [];
  eventsSelected: CalendarEvent[] = [];
  aggiungiButtonDisabled: boolean = false;
  errorMessage = "";
  clientiList: any = [];
  activityList: any = [];
  destinationlist: any = [];
  sede: any = {};
  attivita = "";
  timesheetId : number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<TimesheetAddEventComponent>,
    private formBuilder: FormBuilder,
    private timesheetaddtrasfService: TimesheetaddtrasfService,
    private timesheetService: TimesheethttpService,

  ) { }

  ngOnInit(): void {
    //console.log("data ", this.data);
    this.profileForm = this.formBuilder.group({
      customerId: ['', [Validators.required]],
      activityId: ['', [Validators.required]],
      sedeId: ['', [Validators.required]],
      destTrasf: ['', [Validators.required]],
      eventDate: [this.data.date, [Validators.required]],
    });

    //prendo la sede di lavoro
    this.getSedeDiLavoro(this.data.timesheet.userid);

    //creo la lista dei clienti
    this.clientiList = this.fillArray(this.data.currentValueDay)

    //lista attivita esterne
    this.activityList = this.data.activityList;

    //valorizzio il form alla prima posizione
    if (this.clientiList[0].title != "SEDE") {
      this.flagShowOff = false;
      this.attivita = this.findactivity(this.data.currentValueDay[0].activityId, this.data.currentValueDay[0].customerId,);
      this.profileForm.patchValue({
        customerId :  this.clientiList[0],
        activityId :  this.clientiList[0].activityId,
      })
      this.getPossibleDestination( this.clientiList[0].customerId , this.data.timesheet.userid)

    }else{
      this.flagShowOff = true;
      this.attivita =  this.clientiList[0].internalName + " - " +  this.clientiList[0].internalRuolo;
      this.profileForm.patchValue({
        customerId :  this.clientiList[0],
        activityId :  "0",
      })
      this.getPossibleDestination( "0" , this.data.timesheet.userid)
    }
    this.timesheetId = this.data.timesheet.id;
  }

  fillArray(array) {
    //console.log("custValueDay", custValueDay)
    let mappedArray = array
      .map(x => ({
        title: x.title,
        name: x.customerName != "" ? x.customerName : "Interno - SPS",
        activityId: x.activityId ? x.activityId : "0",
        customerId: x.customerId ? x.customerId : "0",
        internalId: x.InternalId ? x.InternalId : "0",
        internalName: x.internalName ? x.internalName : "",
        internalRuolo: x.internalRuolo ? x.internalRuolo : "",
      })
      )
    //console.log("mappedArray", mappedArray)
    return (mappedArray);
  }

  findactivity(activityId, customerId) {
    let res = ""
    let index = this.activityList.findIndex(
      element => (element.act.id === activityId && element.cus.id === customerId)
    )
    res = this.activityList[index].act.name;
    return (res)
  }

  customerListActions(customer) {
    
    if(customer != undefined){
      if(customer.title != "SEDE") {
        this.flagShowOff = false;
        this.fillNotInternal(customer);
      }else{
        this.flagShowOff = true;
        this.fillInternal(customer);
      }
    }else{
      this.attivita = "";
      this.destinationlist = [];
    }
  }

  fillNotInternal(customer){
    const patch = {
      destTrasf: '',
      activityId: customer.activityId,
    };
    this.profileForm.patchValue(patch);

    this.attivita = this.findactivity(customer.activityId, customer.customerId);

    this.getPossibleDestination(customer.customerId , this.data.timesheet.userid)
  }

  fillInternal(customer){
    const patch = {
      destTrasf: '',
      activityId: "0",
    };

    this.attivita = customer.internalName + " - " + customer.internalRuolo;

    this.getPossibleDestination("0" , this.data.timesheet.userid)

    this.profileForm.patchValue(patch);
  }

  getPossibleDestination(customerId, userId) {
    this.timesheetaddtrasfService.getPossibleDestination(customerId, userId).subscribe(
      res => {
        this.destinationlist = res["data"]
      }
    );
  }

  getSedeDiLavoro(userid) {
    this.timesheetService.getUserData(userid)
      .subscribe(
        userData => {
          this.timesheetService.getUserOffice(userData["data"][0].anad.sededilavoro)
            .subscribe(
              res => {
                this.sede = res["data"]
                this.profileForm.patchValue({
                  sedeId: this.sede.id,
                })
              }
            )
        }
      );
  }

  submit() {
    this.submitted = true
    this.dialogRef.close({ 
      timesheetId: this.timesheetId ,
      trasferta :  this.profileForm.value.destTrasf , 
      data: this.profileForm.value.eventDate });
  }

  close() {
    this.dialogRef.close({ data: 'close' });
  }

  onDateChange(event) {
    this.dateObj = new Date(event.value);
    //console.log(this.dateObj);
    this.getEventsForDate(this.dateObj);
    this.checkIfThisDayIsBusy();
  }

  checkIfThisDayIsBusy() {
    const numberOfEventToday = this.eventsSelected.length;
    //console.log(this.eventsSelected);
    switch (numberOfEventToday) {
      case 1:
        //console.log('case 1');
        this.oneEventThisDay();
        break;

      default:
        //console.log('case default');
        this.aggiungiButtonDisabled = false;
        this.errorMessage = '';
        break;
    }
  }
  oneEventThisDay() {
    const event = this.eventsSelected.pop();
    //console.log(event.title);
    if (event.title === 'MALATT') {
      //this.aggiungiButtonDisabled = true;
      this.errorMessage = 'Giorno di malattia';
    }
    if (event.title === 'MATRIMO') {
      //this.aggiungiButtonDisabled = true;
      this.errorMessage = 'Giorno di Matrimonio';
    }
  }

  getEventsForDate(selectedDate) {
    this.eventsPassed.forEach(event => {
      //console.log(event.start.getDate());
      const eventDay = event.start.getDate();
      const selectedDay = selectedDate.getDate();
      if (eventDay === selectedDay) {
        //console.log("event " + eventDay);
        //console.log("selectedDate " + selectedDay);
        this.eventsSelected.push(event);
      }
    });
    //console.log(this.eventsSelected);
  }
}
