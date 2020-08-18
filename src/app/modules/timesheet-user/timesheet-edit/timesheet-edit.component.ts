import { Timesheet } from './../../../models/timesheet';

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
import { AddEventModalUserComponent } from '../add-event-modal/add-event-modal.component';
import { MatDialog } from '@angular/material/dialog';


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


  //// Ask Confirmation Modal //////////////
  showModalSave = false;
  showModalFreeze = false;
  confirmationMessage = "";
  //////////////////////////////////////////


  actualTimesheetUserId = 0;
  actualTimesheetState = 0;
  actualTimesheet: Timesheetu;
  events: CalendarEvent[] = [];
  ismodifiable = false;

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
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private timesheetService: TimesheetUserService,
  ) { }

  ngOnInit(): void {
    const month = this.viewDate.getMonth();
    const year = this.viewDate.getFullYear();
    const usrId = this.getIdFromLocalStorage();
    this.actualTimesheetUserId = usrId;
    this.timesheetService.getTimesheet(month, year, usrId).subscribe(
      timesheet => {
        if (timesheet === "{}") {
          this.setEmptyCurrentMonthTimesheet();

        } else {
          this.loadCurrentMonthTimesheet(timesheet);
          console.log(this.actualTimesheet.dayjson);
          this.events = this.actualTimesheet.dayjson;
        }
      },
      error => {
        this.setErrorCurrentMonthTimesheet();
        console.log("errore http");
      }
    );
    this.checkIfCanModify();
  }

  myPreviousClick() {
    const month = this.viewDate.getMonth();
    const year = this.viewDate.getFullYear();
    const usrId = this.getIdFromLocalStorage();
    this.events = [];
    this.timesheetService.getTimesheet(month, year, usrId).subscribe(
      timesheet => {
        if (timesheet === "{}") {
          this.setEmptyCurrentMonthTimesheet();

        } else {
          this.loadCurrentMonthTimesheet(timesheet);
          console.log(this.actualTimesheet.dayjson);
          this.events = this.actualTimesheet.dayjson;
        }

      },
      error => {
        this.toastrService.error("Errore Http " + error);
      }
    );
    this.checkIfCanModify();
  }

  myNextClick() {
    const month = this.viewDate.getMonth();
    const year = this.viewDate.getFullYear();
    const usrId = this.getIdFromLocalStorage();
    this.events = [];
    this.timesheetService.getTimesheet(month, year, usrId).subscribe(
      timesheet => {
        if (timesheet === "{}") {

          this.setEmptyCurrentMonthTimesheet();

        } else {

          this.loadCurrentMonthTimesheet(timesheet);
          console.log(this.actualTimesheet.dayjson);
          this.events = this.actualTimesheet.dayjson;
        }

      },
      error => {
        console.log(error);

      }
    );
    this.checkIfCanModify();
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


  createEvent(datenn: any, event: any): void {
    console.log(datenn);
    this.openAddEventDialog();

  }

  handleEvent(action: string, event: CalendarEvent): void {
    console.log(event);
  }

  openAddEventDialog() {
    const dialogRef = this.dialog.open(AddEventModalUserComponent, {
      width: '300px',
      data: { date: this.viewDate }
    });
    dialogRef.afterClosed().subscribe(
      res => {
        if (res.data !== 'close') {
          const event = {
            title: res.data.contractCode,
            start: new Date(res.data.eventDate),
            nOre: res.data.numeroOre,
            actions: this.actions,
          };

          this.events = [...this.events, event];
          this.toastrService.success('Evento aggiunto');
        } else {
          this.toastrService.error('Nessuna operazione effettuata');
        }


      });

  }





  //// UTILITY FUNCTION /////////////////
  closeConfirmationModal() {
    this.showModalSave = false;
    this.showModalFreeze = false;
  }

  askTosaveCurrentTimesheet() {
    this.showModalSave = true;
    if (this.actualTimesheet.id) {
      this.confirmationMessage = 'Vuoi salvare il timesheet  del ' + this.actualTimesheet.month + ' ' + this.actualTimesheet.year;
    }
  }

  saveCurrentTimesheet() {
    if (this.checkIfCanModify()) {
      console.log(this.actualTimesheet);
      if (this.actualTimesheet) {

        this.timesheetService.saveTimesheet(this.actualTimesheet).subscribe(
          timesheet => {
            console.log(timesheet);
            this.loadCurrentMonthTimesheet(timesheet);
            this.events = this.actualTimesheet.dayjson;
            this.closeConfirmationModal();
          },
          error => {

          }

        );
      } else {
        console.log("timesheet vuoto");
        this.createfromEmptyTimesheet();
      }
    } else {
      this.toastrService.error('Non modificabile');
    }
  }

  askToAcceptTimesheet() {
    this.showModalFreeze = true;
    if (this.actualTimesheet.id) {
      this.confirmationMessage = 'Vuoi salvare definitivamente il timesheet  del '
        + this.actualTimesheet.month + ' ' + this.actualTimesheet.year;
    }
  }

  freezeCurrentTimesheet() {
    this.timesheetService.acceptTimesheet(this.actualTimesheet).subscribe(
      timesheet => {

        console.log(timesheet);
        this.loadCurrentMonthTimesheet(timesheet);
        this.events = this.actualTimesheet.dayjson;
        this.closeConfirmationModal();
      },
      error => {

      }
    );

  }

  getIdFromLocalStorage() {
    const tmp = localStorage.getItem('currentUser');
    const tmpArray = JSON.parse(tmp);
    return tmpArray.id;
  }

  createfromEmptyTimesheet() {
    const month = this.viewDate.getMonth();
    const year = this.viewDate.getFullYear();
    const timesheet = {
      month: this.viewDate.getMonth(),
      year: this.viewDate.getFullYear(),
      dayjson: this.events,
      userid: this.actualTimesheetUserId.toString(),
      freezed: '0',
      state: '0',
    };
    this.actualTimesheet = timesheet;
  }

  loadCurrentMonthTimesheet(recivedTimesheet) {
    this.actualTimesheet = recivedTimesheet;
    let tmpEvents = JSON.parse(recivedTimesheet.dayjson);
    this.actualTimesheet.dayjson = []; // non e' sbagliato serve per eliminare le schifezze che potrebbero essere rimaste
    console.log(tmpEvents);
    tmpEvents.forEach(element => {
      const newEvent = {
        title: element.title,
        start: new Date(element.start),
        nOre: element.nOre,
        actions: this.actions,
      };
      this.actualTimesheet.dayjson = [...this.actualTimesheet.dayjson, newEvent];
    });
    this.updateStateLabel();
  }


  setEmptyCurrentMonthTimesheet() {
    this.actualTimesheet = null;
    this.events = [];
    this.timeshetStatus = "Modificabile";


  }

  setErrorCurrentMonthTimesheet() {
    this.actualTimesheet = null;
    this.events = [];
    this.timeshetStatus = "Errato";

  }

  checkIfCanModify() {
    console.log(this.viewDate);
    const now = new Date();
    console.log(now);
    if (isSameMonth(now, this.viewDate) && ( this.timeshetStatus === '1' )) {

      this.ismodifiable = true;
      return true;
    } else {

      this.ismodifiable = false;
      return false;
    }

  }

  updateStateLabel() {
    console.log(this.actualTimesheet.state);
    switch (this.actualTimesheet.state) {
      case '0':
        this.timeshetStatus = "Errato";
        break;

      case '1':
        this.timeshetStatus = "Modificabile";
        break;

      case '2':
        this.timeshetStatus = "Accettato dal dipendente";
        break;

      case '3':
        this.timeshetStatus = "Accettato dall'amministrazione";
        break;

      case '4':
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
