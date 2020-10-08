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
import { ActivatedRoute } from '@angular/router';
import { TimesheethttpService } from '../../services/timesheethttp.service';
import { Timesheet } from '../../model/timesheet';
import { MatDialog } from '@angular/material/dialog';
import { TimesheetAddEventComponent } from '../timesheet-add-event/timesheet-add-event.component';
import { NewCalendarEvent } from '../../model/event';

@Component({
  selector: 'app-timesheet-edit',
  templateUrl: './timesheet-edit.component.html',
  styleUrls: ['./timesheet-edit.component.css']
})
export class TimesheetEditComponent implements OnInit {

  // fake binded params for calendar view ngswitch
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView; // secondo me non ha senso ma l'autore del calendario lo mette bho

  // Questo campo decide su che mese e giornno viene aperto il calendario
  viewDate: Date = new Date();

  // non lo so ma lo vuole
  refresh: Subject<any> = new Subject();

  // lista degli eventi da visualizzare questo mese
  events: CalendarEvent[] = [];



  // flag che governa l'apertura o la chiusura della lista sotto i giorni con eventi
  activeDayIsOpen = false;


  // queste sono le variabili che rappresentano lo stato attuale del timesheet

  // questa label rispecchia lo status del mese attualmente caricato come timesheet
  timeshetStatus = "0";


  currentTimesheetUserId = 0;
  currentTimesheet: Timesheet;
  ismodifiable = true;


  // variabili per le modali di conferma
  showModalSave = false;
  confirmationMessage = '';

  // action definite per gli eventi
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


  constructor(
    public dialog: MatDialog,
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    private timesheetService: TimesheethttpService,
  ) { }

  ngOnInit(): void {
    const month = this.viewDate.getMonth();
    const year = this.viewDate.getFullYear();

    // prendo l'id da dove mi arriva se sono
    // admin dalla lista utenti
    // se sono utente normale dal local storage
    this.route.params.subscribe(
      params => {
        if ( params.id ) {
          console.log("prendo id dal routing");
          this.currentTimesheetUserId = params.id;
        } else {
          console.log("prendo id local storage");
          this.currentTimesheetUserId = this.getIdFromLocalStorage();
        }

    },
    error => {
      console.log("error find addressid");
    });

    // per prima cosa cerchiamo di prendere dal db il timesheet di questo mese se esiste altrimenti
    // dobbiamo creare un timesheet fittizio vuoto

    this.timesheetService.getTimesheet( month, year, this.currentTimesheetUserId  ).subscribe(
      result => {
        if ( result.status === 'done') {

          const recivedTimesheet = result.data as Timesheet;
          this.loadCurrentMonthTimesheet(recivedTimesheet);
          console.log(this.currentTimesheet);
          this.events = this.currentTimesheet.dayjson;
          console.log(this.events);
        } else {
          console.log(result);
          this.currentTimesheet = this.createEmptyTimesheet();
        }
      },
      error => {

      }
    );

    console.log(this.currentTimesheetUserId);
  }

  saveCurrentTimesheet() {
    const month = this.viewDate.getMonth();
    const year = this.viewDate.getFullYear();
    this.currentTimesheet.dayjson = this.events;
    console.log(this.currentTimesheet.dayjson);
    this.timesheetService.saveTimesheet(this.currentTimesheet).subscribe(
      result => {
        if ( result.status === 'done') {
          let prova: Timesheet;
          prova = result.data;
          console.log(result.data);
        } else {
          console.log(result);
        }
      },
      error => {

      }
    );

  }

  myPreviousClick() {
    const month = this.viewDate.getMonth();
    const year = this.viewDate.getFullYear();
    const userid = this.currentTimesheetUserId;
    this.events = [];
    this.timesheetService.getTimesheet(month, year, userid).subscribe(
      timesheet => {
        if ( timesheet.status === 'done') {
          this.loadCurrentMonthTimesheet(timesheet.data);
          console.log(this.currentTimesheet.dayjson);
          this.events = this.currentTimesheet.dayjson;

        } else {

          this.currentTimesheet = this.createEmptyTimesheet();
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
    const userid = this.currentTimesheetUserId;
    this.events = [];
    this.timesheetService.getTimesheet(month, year, userid).subscribe(
      timesheet => {
        if ( timesheet.status === 'done') {
          this.loadCurrentMonthTimesheet(timesheet.data);
          console.log(this.currentTimesheet.dayjson);
          this.events = this.currentTimesheet.dayjson;

        } else {

          this.currentTimesheet = this.createEmptyTimesheet();
        }

      },
      error => {
        this.toastrService.error("Errore Http " + error);
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
  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  createEvent(datenn: any, event: any): void {
    console.log(datenn);
    // this.openAddEventDialog();

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

  createEmptyTimesheet() {
    const month = this.viewDate.getMonth();
    const year = this.viewDate.getFullYear();
    const timesheet = {
      month: this.viewDate.getMonth(),
      year: this.viewDate.getFullYear(),
      dayjson: this.events,
      userid: this.currentTimesheetUserId.toString(),
      freezed: '0',
      state: '0',
    };
    return timesheet;
  }
  openAddEventDialog() {
    if (this.checkIfCanModify()) {
      const dialogRef = this.dialog.open(TimesheetAddEventComponent, {
        width: '600px',
        data: {
                date: this.viewDate,
                eventsList: this.events,
                //activityList: this.assignedActivities,
              }
      });
      dialogRef.afterClosed().subscribe(
        res => {
          if (res.data !== 'close') {
            const event: NewCalendarEvent = {
              title: res.data.contractCode,
              start: new Date(res.data.eventDate),
              nOre: res.data.numeroOre,
              actions: this.actions,
              codiceFatt: res.data.codiceFatturazione,
              nProtocollo: res.data.numProtocollo,
              activityId: res.data.activityId,
              smartWorking: +res.data.smartWorking,
            };

            this.events = [...this.events, event];
            this.toastrService.success('Evento aggiunto');
          } else {
            this.toastrService.error('Nessuna operazione effettuata');
          }


        });
    } else {
      this.toastrService.error('Timesheet accettato');
    }
  }
  eventTimesChanged($event) {

  }

  getIdFromLocalStorage() {
    const tmp = localStorage.getItem('currentUser');
    const tmpArray = JSON.parse(tmp);
    return tmpArray.id;
  }
  checkIfCanModify(){
    // TODO: inserire logica
    return true;
  }
  printEvents(){
    console.log(this.events);
  }

  loadCurrentMonthTimesheet(recivedTimesheet) {
    this.currentTimesheet = recivedTimesheet;
    const tmpEvents = JSON.parse(recivedTimesheet.dayjson);
    this.currentTimesheet.dayjson = []; // non e' sbagliato serve per eliminare le schifezze che potrebbero essere rimaste
    console.log(tmpEvents);
    tmpEvents.forEach(element => {
      const newEvent = {
        title: element.title,
        start: new Date(element.start),
        nOre: element.nOre,
        actions: this.actions,
        codiceFatt: element.codiceFatturazione,
        nProtocollo: element.numProtocollo,
        activityId: element.activityId,
        smartWorking: +element.smartWorking,
      };
      this.currentTimesheet.dayjson = [...this.currentTimesheet.dayjson, newEvent];
    });
    this.updateStateLabel();
  }

  updateStateLabel() {
    console.log(this.currentTimesheet.state);
    this.currentTimesheet.state = this.currentTimesheet.state;
    switch (this.currentTimesheet.state) {
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
    this.checkIfCanModify();
  }
  ///////////////////////////////////////////////////////////////////
  // confirmation modal function
  ///////////////////////////////////////////////////////////////////

  askTosaveCurrentTimesheet() {
    this.showModalSave = true;
    console.log(this.currentTimesheet);
    this.confirmationMessage = 'Vuoi salvare il timesheet  del ' + this.currentTimesheet.month + ' ' + this.currentTimesheet.year;
  }
  closeConfirmationModal() {
    this.showModalSave = false;

  }
}
