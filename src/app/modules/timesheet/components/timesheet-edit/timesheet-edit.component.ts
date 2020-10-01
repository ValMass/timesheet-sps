import { Component, OnInit } from '@angular/core';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
  CalendarEventTitleFormatter,
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

import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-timesheet-edit',
  templateUrl: './timesheet-edit.component.html',
  styleUrls: ['./timesheet-edit.component.css']
})
export class TimesheetEditComponent implements OnInit {

  //fake binded params for calendar view ngswitch
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView; // secondo me non ha senso ma l'autore del calendario lo mette bho

  //Questo campo decide su che mese e giornno viene aperto il calendario
  viewDate: Date = new Date();

  //non lo so ma lo vuole
  refresh: Subject<any> = new Subject();

  //lista degli eventi da visualizzare questo mese
  events: CalendarEvent[] = [];



  //flag che governa l'apertura o la chiusura della lista sotto i giorni con eventi
  activeDayIsOpen = false;

  //questa label rispecchia lo status del mese attualmente caricato come timesheet
  timeshetStatus = "0";


  constructor(
    private toastrService: ToastrService,
  ) { }

  ngOnInit(): void {
  }

  myPreviousClick() {}
  myNextClick() {}

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
  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  createEvent(datenn: any, event: any): void {
    console.log(datenn);
    //this.openAddEventDialog();

  }

  handleEvent(action: string, event: CalendarEvent): void {
    console.log(event);
    if (action === 'Edited'){
      this.toastrService.success("Rimuovi l'evento e ricrealo");
    }

    if (action === 'Deleted'){
      this.toastrService.success('Evento rimosso');
    }
  }

  eventTimesChanged($event) {

  }
}
