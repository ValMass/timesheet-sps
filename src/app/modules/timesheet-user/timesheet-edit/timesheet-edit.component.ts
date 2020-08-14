
import { Component, OnInit } from '@angular/core'; import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { CalendarEventActionsComponent } from 'angular-calendar/modules/common/calendar-event-actions.component';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TimesheetUserService } from '../services/timesheet-user.service';
import { Timesheetu } from '../models/timesheet';


@Component({
  templateUrl: './timesheet-edit.component.html',
  styleUrls: ['./timesheet-edit.component.css']
})
export class TimesheetEditComponent implements OnInit {

// UNKNOWN
modalData: {
  action: string;
  event: CalendarEvent;
};
/////////////////////////////


  actualTimesheetUserId = 0;
  actualTimesheet: Timesheetu;
  events: CalendarEvent[] = [];

  activeDayIsOpen = false;
  viewDate: Date = new Date();
  CalendarView = CalendarView;
  view: CalendarView = CalendarView.Month;
  refresh: Subject<any> = new Subject();

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];
  public timeshetStatus = '';

  constructor(
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private timesheetService: TimesheetUserService,
  ) { }

  ngOnInit(): void {
    const month = this.viewDate.getMonth();
    const year = this.viewDate.getFullYear();
    const usrId = this.getIdFromLocalStorage();
    this.timesheetService.getTimesheet( month, year, usrId).subscribe(
      timesheet => {
        this.loadCurrentMonthTimesheet(timesheet);
        console.log(this.actualTimesheet);
        this.events = this.actualTimesheet.dayjson;


      },
      error => {

      }
    );
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
    console.log(JSON.stringify(events));
  }

  myPreviousClick() {
   /* console.log('se e\' vero so forte');
    const month = this.viewDate.getMonth();
    const year = this.viewDate.getFullYear();
    const userid = this.id;
    this.events = [];
    this.saveCurrentTimesheetInstance.loadCurrentViewedEvent(month, year, userid).subscribe(
      (res) => {
        console.log(res);
        if (res['status'] === 'error') {
          console.log("Error: " + res['message']);

        } else {
          this.currentTimesheet.fromObject(res['data']);
          this.loadCurrentMonthTimesheet(res['data']);
        }
      },
      error => {
        this.toastrService.error('Errore nella richiesta http ');
      }
    );*/
  }

  myNextClick() {
    /*const month = this.viewDate.getMonth();
    const year = this.viewDate.getFullYear();
    const userid = this.id;
    this.events = [];
    this.saveCurrentTimesheetInstance.loadCurrentViewedEvent(month, year, userid).subscribe(
      (res) => {
        console.log(res);
        if (res['status'] === 'error') {
          console.log("Error: " + res['message']);

        } else {
          this.currentTimesheet.fromObject(res['data']);
          this.loadCurrentMonthTimesheet(res['data']);
        }
      },
      error => {
        this.toastrService.error('Errore nella richiesta http ');
      }
    );*/
  }

  createEvent(datenn: any, event: any): void {
    console.log(datenn);
    this.events.forEach(element => {
      // console.log(JSON.stringify(element));
    });
    console.log(JSON.stringify(event));


  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    console.log(event);
  }
  //// UTILITY FUNCTION /////////////////
  getIdFromLocalStorage(){
    const tmp = localStorage.getItem('currentUser');
    const tmpArray = JSON.parse(tmp);
    return tmpArray.id;
  }

  loadCurrentMonthTimesheet(recivedTimesheet) {
    this.actualTimesheet = recivedTimesheet;
    let tmpEvents = JSON.parse(recivedTimesheet.dayjson);

    tmpEvents.forEach(element => {
      const newEvent = {
        title: element.title,
        start: new Date(element.start),
        nOre: element.nOre,
        actions: this.actions,
      }
      this.actualTimesheet.dayjson = [...this.actualTimesheet.dayjson, newEvent];
    });
    this.updateStateLabel();
  }

  updateStateLabel() {
    console.log(this.actualTimesheet.state);
    switch (this.actualTimesheet.state) {
      case '0':
        this.timeshetStatus = "Modificabile";
        break;

      case '1':
        this.timeshetStatus = "Accettato dal dipendente";
        break;

      case '2':
        this.timeshetStatus = "Accettato dall'amministrazione";
        break;

      case '3':
        this.timeshetStatus = "Pagato";
        break;

      default:
        break;
    }
  }


  //// UNKNOWN FUNCTION//////////////////
  eventTimesChanged($event) {

  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  setView(view: CalendarView) {
    this.view = view;
  }
  ///////////////////////////////////
}
