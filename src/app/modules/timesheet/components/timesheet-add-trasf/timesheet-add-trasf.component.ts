import { TimesheethttpService } from './../../services/timesheethttp.service';
import { CalendarEvent } from 'angular-calendar';
import { TimesheetaddeventService } from './../../services/timesheetaddevent.service';
import { TimesheetAddEventComponent } from './../timesheet-add-event/timesheet-add-event.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  officeslist: any;
  activityList: any;
  destinationlist : any; //temp
  currentUserData: any = {};
  sede: any = {};
  attivita = "";

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<TimesheetAddEventComponent>,
    private formBuilder: FormBuilder,
    private timesheetaddeventService: TimesheetaddeventService,
    private timesheetService: TimesheethttpService,

  ) { }

  ngOnInit(): void {
    console.log("data ", this.data);
    this.profileForm = this.formBuilder.group({
      customerId: ['', [Validators.required]],
      activityId: ['', [Validators.required]],
      sedeId :      ['' ,  [Validators.required]],
      destTrasf:  ['', [Validators.required]],
      eventDate:  [this.data.date, [Validators.required]],
    });
    this.activityList = this.data.activityList;
    this.clientiList = this.data.currentValueDay;
    this.profileForm.patchValue({
      customerId :  this.data.currentValueDay[0].customerId,
      activityId :  this.data.currentValueDay[0].activityId,
    })
    this.attivita = this.findactivity( this.data.currentValueDay[0].activityId , this.data.currentValueDay[0].customerId,);
    this.getSedeDiLavoro(this.data.timesheet.userid);
    this.getoffices(this.data.currentValueDay[0].customerId);
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

  getPossibleDestination(id){
      this.timesheetService.getPossibleDestination(id).subscribe(
        res => {
          //console.log(res);
          this.destinationlist = res["data"];
          //console.log(this.destinations);
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
                  sedeId : this.sede.id,
                })
              }
            )
        }
      );
  }

   
  findactivity(activityId , customerId){
    let res = ""
    let index = this.activityList.findIndex(
      element => (element.act.id === activityId && element.cus.id === customerId)
    )
    res =this.activityList[index].act.name;
    return(res)
  }

  customerListActions(customer) {
    
    const patch = {
      destTrasf: '',
      activityId: customer.activityId,
    };

    this.attivita = this.findactivity(customer.activityId , customer.customerId);
    
    this.profileForm.patchValue(patch);
    if ((customer != undefined)) {
      this.getoffices(customer.customerId)
    } else {
      this.officeslist = [];
    }
  }
 
  submit() {
    this.submitted = true
    console.log("submit", this.profileForm.value);
  }

  close() {
    this.dialogRef.close({ data: 'close' });
  }
}
