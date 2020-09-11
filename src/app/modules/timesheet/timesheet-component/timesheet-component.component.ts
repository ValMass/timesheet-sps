
import { Timesheet } from '../models/timesheet';
import { Component, OnInit } from '@angular/core';
import {
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

import { AddEventModalComponent, } from '../add-event-modal/add-event-modal.component';
import { CalendarEventActionsComponent } from 'angular-calendar/modules/common/calendar-event-actions.component';
import { GenericResponse } from '@app/models/genericresponse';
import { Subject } from 'rxjs';
// colors definition for event
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from '@app/services/authentication.service';
import { TimesheetResolverService } from '../services/timesheet-resolver.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';





const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

export class MyCalendarEvent implements CalendarEvent {
  title: string;
  start: Date;
  nOre: number;
  actions: CalendarEventAction[];
  codiceFatt?: string;
  nProtocollo?: string;

}

@Component({
  selector: 'app-timesheet-component',
  templateUrl: './timesheet-component.component.html',
  styleUrls: ['./timesheet-component.component.css']
})
export class NewTimesheetComponentComponent implements OnInit {

  constructor(
    private saveCurrentTimesheetInstance: TimesheetResolverService,
    public dialog: MatDialog,
    public timesheetRes: TimesheetResolverService,
    public logoutService: AuthenticationService,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    // private confirmationDialogService: ConfirmationDialogService
  ) { }

  id: any; // id of logged admin user for later use;

  //information showed on screen current timesheet
  actualTimesheet = {}; // deprecated
  public currentTimesheet = new Timesheet();
  actualTimesheetUserId = '0';


  newEvent: MyCalendarEvent = new MyCalendarEvent();

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  activeDayIsOpen = false;


  refresh: Subject<any> = new Subject();

  //for confirmation modal
  message = '';
  isOpen = false;
  showModalSave = false;
  showModalFreeze = false;
  showModalPay = false;
  showModalReset = false;



  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'lavoro',
      color: colors.red,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      start: startOfDay(new Date()),
      title: 'ferie',
      color: colors.yellow,
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'permesso',
      color: colors.blue,
      allDay: true,
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: 'A draggable and resizable event',
      color: colors.yellow,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
  ];

  modalData: {
    action: string;
    event: CalendarEvent;
  };

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



  ngOnInit() {

    this.route.params.subscribe(params => {
      this.actualTimesheetUserId = params.id;
    });
    const month = this.viewDate.getMonth();
    const year = this.viewDate.getFullYear();
    this.events = [];
    console.log(month + ' ' + year + ' ' + this.actualTimesheetUserId);
    this.timesheetRes.getTimesheet(month, year, this.actualTimesheetUserId).subscribe(
      (res) => {
        console.log(res);
        if (res['status'] === 'error') {
          console.log("Error: " + res['message']);

        } else {
          this.currentTimesheet.fromObject(res['data']);
          this.loadCurrentMonthTimesheet(res['data']);
        }
      }

    );

  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    console.log(event);
    if ( action === "Edited" ) {
      this.openEditDialog(this.modalData);
    }
    if ( action === "Deleted" ) {

    }
  }

  setView(view: CalendarView) {
    this.view = view;
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
    this.events.forEach(element => {
      // console.log(JSON.stringify(element));
    });
    console.log(JSON.stringify(event));


  }

  saveCurrentTimesheet() {
    const month = this.viewDate.getMonth();
    const year = this.viewDate.getFullYear();
    this.saveCurrentTimesheetInstance.save(this.events, month, year, this.actualTimesheetUserId)
      .subscribe(
        res => {
          console.log(res);
          if (res['status'] === 'error') {

            this.toastrService.error('Errore durante il salvattaggio del timesheet: ' + res['message']);
          } else {
            this.events = [];
            this.currentTimesheet.fromObject(res['data']);
            this.loadCurrentMonthTimesheet(res['data']);
            this.toastrService.success('Timesheet salvato');
          }

        },
        error => {
          this.toastrService.error('Errore nella richiesta http ');
        });
    this.closeModal();
  }

  freezeCurrentTimesheet() {
    const month = this.viewDate.getMonth();
    const year = this.viewDate.getFullYear();
    this.timesheetRes.freeze(month, year, this.actualTimesheetUserId)
      .subscribe(data => {
        if (data['status'] === 'error') {
          this.toastrService.error('Errore durante il salvattaggio del timesheet: ' + data['message']);

        } else {
          this.events = [];
          this.loadCurrentMonthTimesheet(data['data']);
          this.toastrService.success('Stato aggiornato');
        }


      },
      error => {
        this.toastrService.error('Errore nella richiesta http ');
      });
    this.closeModal();
  }

  resetTimesheetState() {
    const month = this.viewDate.getMonth();
    const year = this.viewDate.getFullYear();
    this.timesheetRes.resetState(month, year, this.actualTimesheetUserId)
      .subscribe(data => {
        if (data['status'] === 'error') {
          this.toastrService.error('Errore durante il salvattaggio del timesheet: ' + data['message']);
          this.createfromEmptyTimesheet();

        } else {
          this.events = [];
          this.loadCurrentMonthTimesheet(data['data']);
          this.toastrService.success('Stato aggiornato');
        }


      },
      error => {
        this.toastrService.error('Errore nella richiesta http ');
      });
    this.closeModal();
  }


  openDialog() {
    const dialogRef = this.dialog.open(AddEventModalComponent, {
      width: '400px',
      data: { date : this.viewDate,
              isEdit: false,
              toEdit: null
            }
    });
    dialogRef.afterClosed().subscribe(
      res => {
        console.log(res.data);
        const newEvent: MyCalendarEvent = new MyCalendarEvent();
        newEvent.title = res.data.contractCode;
        newEvent.start = new Date(res.data.eventDate);
        newEvent.nOre = res.data.numeroOre;
        newEvent.codiceFatt = res.data.codiceFatturazione;
        console.log(newEvent);
        this.events = [...this.events, newEvent];
      });

  }
  openEditDialog(modalData) {
    const dialogRef = this.dialog.open(AddEventModalComponent, {
      width: '400px',
      data: { date : this.viewDate,
              isEdit: true,
              toEdit: modalData.event
            }
    });
    dialogRef.afterClosed().subscribe(
      res => {
        console.log(res.data);
        const newEvent: MyCalendarEvent = new MyCalendarEvent();
        newEvent.title = res.data.contractCode;
        newEvent.start = new Date(res.data.eventDate);
        newEvent.nOre = res.data.numeroOre;
        console.log(newEvent);
        this.events = [...this.events, newEvent];
      });

  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  myPreviousClick() {
    console.log('se e\' vero so forte');
    const month = this.viewDate.getMonth();
    const year = this.viewDate.getFullYear();
    this.events = [];
    this.saveCurrentTimesheetInstance.loadCurrentViewedEvent(month, year, this.actualTimesheetUserId).subscribe(
      (res) => {
        console.log(res);
        if (res['status'] === 'error') {
          console.log("Error: " + res['message']);
          this.createfromEmptyTimesheet();

        } else {
          this.currentTimesheet.fromObject(res['data']);
          this.loadCurrentMonthTimesheet(res['data']);
        }
      },
      error => {
        this.toastrService.error('Errore nella richiesta http ');
      }
    );
  }

  myNextClick() {
    const month = this.viewDate.getMonth();
    const year = this.viewDate.getFullYear();
    this.events = [];
    this.saveCurrentTimesheetInstance.loadCurrentViewedEvent(month, year, this.actualTimesheetUserId).subscribe(
      (res) => {
        console.log(res);
        if (res['status'] === 'error') {
          console.log("Error: " + res['message']);
          this.createfromEmptyTimesheet();

        } else {
          this.currentTimesheet.fromObject(res['data']);
          this.loadCurrentMonthTimesheet(res['data']);
        }
      },
      error => {
        this.toastrService.error('Errore nella richiesta http ');
      }
    );
  }

  eventTimesChanged($event) {

  }

  loadCurrentMonthTimesheet(recivedTimesheet) {
    this.currentTimesheet.fromObject(recivedTimesheet);
    this.currentTimesheet.dayJson.forEach(element => {
      const newEvent = {
        title: element.title,
        start: new Date(element.start),
        nOre: element.nOre,
        actions: this.actions,
        codiceFatt: element.codiceFatt,
        nProtocollo: element.nProtocollo,
      }
      this.events = [...this.events, newEvent];
    });
    this.updateStateLabel();

  }

  eventTitleTranslate(title) {
    /*
    <option value="LAVORO" selected="selected">Lavoro ordinario</option>
        <option value="SEDE">Attività interna</option>
        <option value="PERMNON">Permesso non retribuito</option>
        <option value="PERMESS">Permesso generico</option>
        <option value="MALATT">Malattia</option>
        <option value="LUTTO">Lutto parente primo grado</option>
        <option value="AVIS">Donazione sangue</option>
        <option value="FERIE">Ferie</option>
        <option value="MATALA">Allattamento</option>
        <option value="ASPETT">Aspettativa</option>
        <option value="ELETTO">Permesso elettorale</option>
        <option value="FESTSOP">Festivita soppresse</option>
        <option value="MATERN">Materrnita</option>
        <option value="MATFAC">Maternita facoltativa</option>
        <option value="MALFIG">Malattia figlio</option>
        <option value="MATRIMO">Matrimonio</option>
        <option value="PARTIME">Tempo parziale</option>
        <option value="PATRONO">Patrono</option>
        <option value="UNIVERS">Assenza esami universitari</option>
    */
  }

  checkIfTimesheetIsModifiable() {
    console.log(this.events);
    console.log(this.logoutService.currentUserValue.isadmin);
    switch (this.logoutService.currentUserValue.isadmin) {
      case '1':
        break;

      case '2':

        break;

      default:
        this.toastrService.error('Ruolo non esistente');
        return false;
        break;
    }



  }

  createfromEmptyTimesheet() {
    const month = this.viewDate.getMonth();
    const year = this.viewDate.getFullYear();
    this.currentTimesheet = new Timesheet();
    this.currentTimesheet.month = String(this.viewDate.getMonth());
    this.currentTimesheet.year = String(this.viewDate.getFullYear());
    this.currentTimesheet.dayJson = [];
    this.currentTimesheet.userid = this.actualTimesheetUserId;
    this.currentTimesheet.freezed = '0';
    this.currentTimesheet.state = '1';
    this.currentTimesheet.totaldeseasehours = '0';
    this.updateStateLabel();
  }

  payTimesheet() {

  }

  updateStateLabel() {
    console.log(this.currentTimesheet.state);
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
        this.timeshetStatus = "       ";
        break;
    }
  }

  askTosaveCurrentTimesheet() {
    this.showModalSave = true;
    if (this.currentTimesheet.id) {
      this.message = 'Vuoi salvare il timesheet  del ' + this.currentTimesheet.month + ' ' + this.currentTimesheet.year;
    }
  }
  askToFreeze() {
    this.showModalFreeze = true;
    if (this.currentTimesheet.id) {
      this.message = 'Vuoi accettare il timesheet del ' + this.currentTimesheet.month + ' ' + this.currentTimesheet.year;
    }
  }

  askToPayTimesheet() {
    this.showModalPay = true;
    if (this.currentTimesheet.id) {
      this.message = 'Vuoi archiviare il timesheet del ' + this.currentTimesheet.month + ' ' + this.currentTimesheet.year;
    }
  }

  askToResetState() {
    this.showModalReset = true;
    if (this.currentTimesheet.id) {
      this.message = 'Vuoi resettare lo stato del timesheet del ' + this.currentTimesheet.month + ' ' + this.currentTimesheet.year;
    }
  }

  closeModal() {
    this.showModalSave = false;
    this.showModalFreeze = false;
    this.showModalPay = false;
    this.showModalReset = false;
  }

  anzia() {
    console.log(this.events);
    console.log(this.currentTimesheet);
  }
}
