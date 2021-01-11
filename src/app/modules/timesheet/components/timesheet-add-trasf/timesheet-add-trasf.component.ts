import { TimesheethttpService } from './../../services/timesheethttp.service';
import { CalendarEvent } from 'angular-calendar';
import { TimesheetaddeventService } from './../../services/timesheetaddevent.service';
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
  flagShow: boolean = true;
  dateObj: any;
  eventsPassed: CalendarEvent[] = [];
  eventsSelected: CalendarEvent[] = [];
  aggiungiButtonDisabled: boolean = false;
  errorMessage = "";
  clientiList: any;
  clientiListTemp: any[];
  officeslist: any;
  activityList: any = [];
  destinationlist: any; //temp
  currentUserData: any = {};
  sede: any = {};
  attivita = "";


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<TimesheetAddEventComponent>,
    private formBuilder: FormBuilder,
    private timesheetaddeventService: TimesheetaddeventService,
    private timesheetaddtrasfService: TimesheetaddtrasfService,
    private timesheetService: TimesheethttpService,

  ) { }

  ngOnInit(): void {
    console.log("data ", this.data);
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
      this.attivita = this.findactivity(this.data.currentValueDay[0].activityId, this.data.currentValueDay[0].customerId,);
      this.profileForm.patchValue({
        customerId :  this.clientiList[0],
        activityId :  this.clientiList[0].activityId,
      })
    }else{
      this.attivita =  this.clientiList[0].internalName + " - " +  this.clientiList[0].internalRuolo;
      this.profileForm.patchValue({
        customerId :  this.clientiList[0],
        activityId :  0,
      })
    }
    //lista delle destinazioni
    //this.getoffices(this.data.currentValueDay[0].customerId);
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
    //console.log("customer", customer)
    if (customer.title != "SEDE") {
      this.fillNotInternal(customer);
    }else{
      this.fillInternal(customer);
    }
  }

  fillNotInternal(customer){
    const patch = {
      destTrasf: '',
      activityId: customer.activityId,
    };
    this.profileForm.patchValue(patch);

    this.attivita = this.findactivity(customer.activityId, customer.customerId);

    if ((customer != undefined)) {
      //this.getoffices(customer.customerId)
    } else {
      this.officeslist = [];
    }
  }

  fillInternal(customer){
    const patch = {
      destTrasf: '',
      activityId: "0",
    };

    this.attivita = customer.internalName + " - " + customer.internalRuolo;

    this.profileForm.patchValue(patch);
  }
  
  //TODO
  getoffices(id) {
    this.timesheetaddeventService.getOfficesByCustomer(id).subscribe(
      result => {
        if (result['status'] === 'error') {
          this.officeslist = [];
        } else {
          this.officeslist = result['data'].map(x => x);
        }
      }, error => {
        this.officeslist = [];
      }
    );
  }

  //TODO
  getPossibleDestination(customerId, userId, officesId) {
    this.timesheetaddtrasfService.getPossibleDestination(customerId, userId, officesId).subscribe(
      res => {
        console.log(res);
      }
    );
  }

  //TODO
  addTrasferte(timesheetId, trasferta, data){
    this.timesheetaddtrasfService.addTrasferta(timesheetId, trasferta, data).subscribe(
      res => {
        console.log(res);
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
    console.log("submit", this.profileForm.value);
  }

  close() {
    this.dialogRef.close({ data: 'close' });
  }

  onDateChange(event) {
    this.dateObj = new Date(event.value);
    console.log(this.dateObj);
    this.getEventsForDate(this.dateObj);
    this.checkIfThisDayIsBusy();
  }

  checkIfThisDayIsBusy() {
    const numberOfEventToday = this.eventsSelected.length;
    console.log(this.eventsSelected);
    switch (numberOfEventToday) {
      case 1:
        console.log('case 1');
        this.oneEventThisDay();
        break;

      default:
        console.log('case default');
        this.aggiungiButtonDisabled = false;
        this.errorMessage = '';
        break;
    }
  }
  oneEventThisDay() {
    const event = this.eventsSelected.pop();
    console.log(event.title);
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
      console.log(event.start.getDate());
      const eventDay = event.start.getDate();
      const selectedDay = selectedDate.getDate();
      if (eventDay === selectedDay) {
        console.log("event " + eventDay);
        console.log("selectedDate " + selectedDay);
        this.eventsSelected.push(event);
      }
    });
    console.log(this.eventsSelected);
  }
}
