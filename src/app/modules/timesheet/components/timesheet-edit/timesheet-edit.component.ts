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

  // queste due proprieta governano la presenza o meno dei bottoni per poter modificare gli eventi
  //la prima decide se vedo i bottoni dell amministratore o dell utente
  adminStyle = false;
  //la seconda decide se mostrare o meno i bottoni in tutti e due i casi
  ismodifiable = true;



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

  // queste label governano l'apertura delle modali che chiedono conferma al click dei vari bottoni
  // variabili per le modali di conferma
  showModalSave = false;
  showAcceptAsUser = false;
  showAcceptAsAdmin = false;
  showAcceptAsFinally = false;
  showResetStatus = false;
  // questo e' il messaggio visualizzato dalle modali di conferma
  confirmationMessage = '';


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
          this.adminStyle = true;
        } else {
          console.log("prendo id local storage");
          this.currentTimesheetUserId = this.getIdFromLocalStorage();
          this.adminStyle = false;
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
          this.updateStateLabel();
        } else {
          console.log(result);
          this.currentTimesheet = this.createEmptyTimesheet();
          this.updateStateLabel();
        }
      },
      error => {

      }
    );

    console.log(this.currentTimesheetUserId);

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
          this.updateStateLabel();

        } else {

          this.currentTimesheet = this.createEmptyTimesheet();
          this.updateStateLabel();
        }

      },
      error => {
        this.toastrService.error("Errore Http " + error);
      }
    );
    this.checkIfCanModify();

  }

  isDisabled() {
    return new Date().getMonth() === this.viewDate.getMonth() ? true : false;
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
          this.updateStateLabel();
        } else {

          this.currentTimesheet = this.createEmptyTimesheet();
          this.updateStateLabel();
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
      validatedbyadmin: '0',
      validatebyuser: '0',
      validatebyfinal: '0',
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
        this.timeshetStatus = "Non inizializzato";
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
    const month = this.viewDate.getMonth();
    const year = this.viewDate.getFullYear();
    this.showModalSave = true;
    console.log(this.currentTimesheet);
    this.confirmationMessage = 'Vuoi salvare il timesheet  del ' + month + '/' + year;
  }

  saveCurrentTimesheet() {
    const month = this.viewDate.getMonth();
    const year = this.viewDate.getFullYear();
    this.currentTimesheet.dayjson = this.events;
    console.log(this.currentTimesheet.dayjson);
    this.timesheetService.saveTimesheet(this.currentTimesheet).subscribe(
      result => {
        if ( result.status === 'done') {
          this.toastrService.success('Timesheet salvato');
          this.loadCurrentMonthTimesheet(result.data);
          console.log("saved");
        } else {
          console.log("error");
          this.toastrService.error(result.message);
          return false;
        }
      },
      error => {
        this.toastrService.error('Http Error');
        return false;
      }
    );
    this.closeConfirmationModal();
  }

  askToAcceptAsUser() {
    this.showAcceptAsUser = true;
    console.log(this.currentTimesheet);
    this.confirmationMessage = 'Vuoi salvare il timesheet  del ' + this.currentTimesheet.month + ' ' + this.currentTimesheet.year;
  }

  acceptAsUser() {
    const month = this.viewDate.getMonth();
    const year = this.viewDate.getFullYear();
    const userid = this.currentTimesheetUserId;
    this.timesheetService.acceptAsUser(month, year, userid).subscribe(
      result => {
        if( result.status === "done" ){
          this.loadCurrentMonthTimesheet(result.data);
          this.toastrService.success('Timesheet accettato dall utente ');
          this.updateStateLabel();

        } else {
          this.toastrService.error(result.message);
        }
      },
       error => {
        this.toastrService.error(error);
       }
    );
    this.closeConfirmationModal();
  }

  askToAcceptAsAdmin() {
    this.showAcceptAsAdmin = true;
    console.log(this.currentTimesheet);
    this.confirmationMessage = 'Vuoi confermare il timesheet  del ' + this.currentTimesheet.month + ' ' + this.currentTimesheet.year;
    console.log("askToAcceptAsAdmin");
  }

  acceptAsAdmin() {
    const month = this.viewDate.getMonth();
    const year = this.viewDate.getFullYear();
    const userid = this.currentTimesheetUserId;
    this.timesheetService.acceptAsAdmin(month, year, userid).subscribe(
      result => {
        if(result.status === "done"){
          this.loadCurrentMonthTimesheet(result.data);
          this.toastrService.success('Timesheet accettato dall amministrazione ');
          this.updateStateLabel();

        } else {
          this.toastrService.error(result.message);
        }
      },
       error => {
        this.toastrService.error(error);
       }
    );
    this.closeConfirmationModal();

  }

  askToAcceptAsFinally() {
    this.showAcceptAsFinally = true;
    console.log(this.currentTimesheet);
    this.confirmationMessage = 'Vuoi confermare definitivamente il timesheet  del '
    + this.currentTimesheet.month + ' ' + this.currentTimesheet.year;
    console.log("askToAcceptAsUser");
  }

  acceptAsFinally() {
    const month = this.viewDate.getMonth();
    const year = this.viewDate.getFullYear();
    const userid = this.currentTimesheetUserId;
    this.timesheetService.acceptAsFinally(month, year, userid).subscribe(
      result => {
        if(result.status === "done"){
          this.loadCurrentMonthTimesheet(result.data);
          this.toastrService.success('Timesheet accettato definitivamente ');
          this.updateStateLabel();

        } else {
          this.toastrService.error(result.message);
        }
      },
       error => {
        this.toastrService.error(error);
       }
    );
    this.closeConfirmationModal();


  }

  askToResetStatus() {
    this.showResetStatus = true;
    console.log(this.currentTimesheet);
    this.confirmationMessage = 'Vuoi rendere nuovamente modificabile il timesheet  del '
    + this.currentTimesheet.month + ' ' + this.currentTimesheet.year;
    console.log("askToAcceptAsUser");
  }

  ResetStatus() {
    const month = this.viewDate.getMonth();
    const year = this.viewDate.getFullYear();
    const userid = this.currentTimesheetUserId;
    this.timesheetService.resetState(month, year, userid).subscribe(
      result => {
        if(result.status === "done"){
          this.loadCurrentMonthTimesheet(result.data);
          this.toastrService.success('Timesheet torna modificabile');
          this.updateStateLabel();

        } else {
          this.toastrService.error(result.message);
        }
      },
       error => {
        this.toastrService.error(error);
       }
    );
    this.closeConfirmationModal();
  }

  /**
   * questa funzione chiude tutte le modali che chiedono conferma delle operazioni
   */
  closeConfirmationModal() {
    this.showModalSave = false;
    this.showAcceptAsUser = false;
    this.showAcceptAsAdmin = false;
    this.showAcceptAsFinally = false;
    this.showResetStatus = false;

  }
}
