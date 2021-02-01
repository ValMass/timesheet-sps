import { TimesheetaddtrasfService } from './../../services/timesheetaddtrasf.service';
import { TimesheetAddTrasfComponent } from './../timesheet-add-trasf/timesheet-add-trasf.component';
import { Trasferta } from './../../model/trasferta';
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
import { ActivatedRoute, Router } from '@angular/router';
import { TimesheethttpService } from '../../services/timesheethttp.service';
import { Timesheet } from '../../model/timesheet';
import { MatDialog } from '@angular/material/dialog';
import { TimesheetAddEventComponent } from '../timesheet-add-event/timesheet-add-event.component';
import { TimesheetTrasferteModalComponent } from '../timesheet-trasferte-modal/timesheet-trasferte-modal.component';
import { NewCalendarEvent } from '../../model/event';
import { FileService } from '@app/shared/services/file.service';
import * as fileSaver from 'file-saver';
import { AuthenticationService } from '@app/services/authentication.service';
import { User } from '@app/models/user';
import { EventTitleFormatter } from './eventTitleFormatter';

@Component({
  selector: 'app-timesheet-edit',
  templateUrl: './timesheet-edit.component.html',
  styleUrls: ['./timesheet-edit.component.css'],
  providers: [
    {
      provide: CalendarEventTitleFormatter,
      useClass: EventTitleFormatter,
    },
  ],
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
  timeshetStatus = '0';

  currentTimesheetUserId = 0;
  currentTimesheet: Timesheet;

  // queste due proprieta governano la presenza o meno dei bottoni per poter modificare gli eventi
  //la prima decide se vedo i bottoni dell amministratore o dell utente
  adminStyle = false;
  //la seconda decide se mostrare o meno i bottoni in tutti e due i casi
  ismodifiable = true;

  // lista delle attività assegnate all utente
  assignedActivities = [];
  distaccatoPresso:string = "";
  assignedInternalsActivities = [];

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
        this.handleEvent('Deleted', event);
      },
    },
  ];

  actionsOnlyDel: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
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
  showModalAddTrasf =  false;
  // questo e' il messaggio visualizzato dalle modali di conferma
  confirmationMessage = '';

  //variabili che controllano i tasti a seconda dello stato del timesheet
  disableAggiungiEvento = true;
  disableCalcolaTrasferte = false;
  disableSalva = false;
  disableAzeraStato = false;
  disableAccettaComeUtente = false;
  disableAccettaComeAmministratore = false;

  // variabili per gestire la visibilita del bottone aaccetta come finally
  disableAccettaComeFinally = false; // gestisce la visibilità
  veroDisableFinally = false; // gestisce il disable
  currentUserInfo: any;

  alertFlagTrasf : boolean = true;
  alertFlagAdmin : boolean = true;
  alertFlagUser : boolean = true;
  currentValueDay : any = [];
  disableAddTrasf : boolean = true;
  eventAddedTrasf : any = [];
  trasferteStatus : boolean = false;
  //flag che controllano se il timesheet è salvato 
  isTimesheetSave : boolean = false;
  timesheetSaved : boolean = false;

  constructor(
    public dialog: MatDialog,
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private timesheetService: TimesheethttpService,
    private timesheetaddtrasfService: TimesheetaddtrasfService,
    private fileservice: FileService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    const month = this.viewDate.getMonth();
    const year = this.viewDate.getFullYear();

    // prendo l'id da dove mi arriva se sono
    // admin dalla lista utenti
    // se sono utente normale dal local storage
    this.route.params.subscribe(
      (params) => {
        if (params.id) {
          console.log('prendo id dal routing');
          this.currentTimesheetUserId = params.id;
          this.adminStyle = true;
        } else {
          console.log('prendo id local storage');
          this.currentTimesheetUserId = this.getIdFromLocalStorage();
          this.adminStyle = false;
        }
        console.log(this.currentTimesheetUserId);
      },
      (error) => {
        console.log('error find addressid');
      }
    );

    // per prima cosa cerchiamo di prendere dal db il timesheet di questo mese se esiste altrimenti
    // dobbiamo creare un timesheet fittizio vuoto
    this.timesheetService
      .getTimesheet(month, year, this.currentTimesheetUserId)
      .subscribe(
        (result) => {
          if (result.status === 'done') {
            this.distaccatoPresso = result.data.distaccato;
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
        (error) => {}
      );

    this.timesheetService.listActivities(this.currentTimesheetUserId).subscribe(
      (result) => {
        if (result.status === 'done') {
          this.assignedActivities = result.data;
          console.log(result);
          console.log(this.assignedActivities);
        } else {
        }
      },
      (error) => {}
    );

    this.timesheetService.getInternalActivities(this.currentTimesheetUserId).subscribe(
      (result) => {
        if (result.status === 'done') {
          this.assignedInternalsActivities = result.data;
          //console.log(result);
          //console.log(this.assignedInternalsActivities);
        } else {
        }
      },
      (error) => {}
    );
    this.timesheetService.getUserData(this.currentTimesheetUserId).subscribe(
      result => {
        if (result.status === 'done') {
          this.currentUserInfo = result.data;
          console.log(result);
          console.log(this.currentUserInfo);
        } else {
        }
      }
    );
    console.log(this.currentTimesheetUserId);
  }

  myPreviousClick() {
    const month = this.viewDate.getMonth();
    const year = this.viewDate.getFullYear();
    const userid = this.currentTimesheetUserId; // TODO verificare che e' lid giusto
    this.events = [];
    this.timesheetService.getTimesheet(month, year, userid).subscribe(
      (timesheet) => {
        if (timesheet.status === 'done') {
          console.log(timesheet);
          this.distaccatoPresso = timesheet.data.distaccato;
          const recivedTimesheet = timesheet.data as Timesheet;
          this.loadCurrentMonthTimesheet(recivedTimesheet);
          console.log(this.currentTimesheet.dayjson);
          this.events = this.currentTimesheet.dayjson;
          this.updateStateLabel();
        } else {
          this.currentTimesheet = this.createEmptyTimesheet();
          console.log(timesheet);
          this.updateStateLabel();
        }
      },
      (error) => {
        this.toastrService.error('Errore Http ' + error);
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
      (timesheet) => {
        if (timesheet.status === 'done') {
          this.distaccatoPresso = timesheet.data.distaccato;
          const recivedTimesheet = timesheet.data as Timesheet;
          this.loadCurrentMonthTimesheet(recivedTimesheet);
          console.log(this.currentTimesheet.dayjson);
          this.events = this.currentTimesheet.dayjson;
          this.updateStateLabel();
        } else {
          this.currentTimesheet = this.createEmptyTimesheet();
          this.updateStateLabel();
        }
      },
      (error) => {
        this.toastrService.error('Errore Http ' + error);
      }
    );
    this.checkIfCanModify();
  }

  //TODO
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if(this.checkIfCurrentValueDay(events) &&
      !((this.getRoleFromLocalStorage() === '1') && (this.currentTimesheet.state === '4') )){
      this.currentValueDay = events;
      //console.log("currentValueDay" , this.currentValueDay)
      this.disableAddTrasf = false;
    }else{
      this.disableAddTrasf = true;
    }
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
    // console.log(events);
    // console.log(JSON.stringify(events));
  }

  checkIfCurrentValueDay(valueDay){
    let res : boolean = false
    if(valueDay.length > 0){
      for(let j : number = 0; j < valueDay.length; j ++){
        if((valueDay[j].title == "LAVORO") ||
            (valueDay[j].title == "SEDE") ||
            (valueDay[j].title == "PARTIME")){
              res = true;
              break;
            }
        }
    }
    return(res);
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  createEvent(datenn: any, event: any): void {
    console.log(datenn);
    // this.openAddEventDialog();
  }

  checkIfCanEditOrDelete(): boolean {
    if (this.currentTimesheet.state === '2' || this.currentTimesheet.state === '3' || this.currentTimesheet.state === '4') {
      if (this.getRoleFromLocalStorage() !== '0' && this.getRoleFromLocalStorage() !== '1') {
        this.toastrService.info('Impossibile modificare perchè già accettato');
        return false;
      } else {
        return true;
      }
    } /*else if (this.currentTimesheet.state === '4') {
      this.toastrService.info('Impossibile modificare perchè già pagato');
      return false;
    }*/else {
      return true;
    }
  }

  handleEvent(action: string, eventToUpdate: CalendarEvent): void {
    console.log("edit" , eventToUpdate)
    if (action === 'Edited' && this.checkIfCanEditOrDelete()) {
      const dialogRef = this.dialog.open(TimesheetAddEventComponent, {
        width: '600px',
        data: {
          event: eventToUpdate,
          date: eventToUpdate.start,
          activityList: this.assignedActivities,
          internalsActivitiesList : this.assignedInternalsActivities,
          type: 'edit',
          readonlyEdit :( this.timeshetStatus === 'Pagato' && this.currentTimesheet.state === '4' &&  this.getRoleFromLocalStorage() !== '0' )? true : false,
        },
      });
      dialogRef.afterClosed().subscribe((res) => {
        if (res) {
          if (res.data !== 'close') {
            console.log("reshandleEvent" , res)
            const event: NewCalendarEvent = {
              title: res.data.contractCode,
              start: new Date(res.data.eventDate),
              nOre: res.data.numeroOre,
              actions: this.actions,
              codiceFatt: res.data.codiceFatturazione,
              numProtocollo: res.data.numProtocollo,
              activityId: res.data.activityId,
              smartWorking: +res.data.smartWorking,
              contractCode: res.data.title,
              customerId: res.data.customerId,
              internalId: res.data.internalId,
              internalName: res.data.internalName,
              internalRuolo: res.data.internalRuolo,
              destinazione: res.data.destinazione,
              cssClass: this.selectCssIcon(res.data),
              draggable: this.isDraggable(res.data),
              customerName: res.data.contractCode === 'LAVORO' ||  res.data.contractCode === 'PARTIME' ? this.assignedActivities.map(cus => cus['cus']).filter(cusName => res.data.customerId === cusName['id'])[0]['name'] : '',
            };
            //console.log("event" , event)
            const targetEvent = this.events.findIndex(item => item.start === res.data.eventDate);
            this.events[targetEvent] = event;
            this.events = [...this.events];
            this.toastrService.success('Evento aggiornato temporaneamente. Salvare il timesheet per applicare le modifiche');
            this.isTimesheetSave = false;
          } else {
            this.toastrService.error('Nessuna operazione effettuata');
          }
        }
      });
    } else if (action === 'Deleted' && this.checkIfCanEditOrDelete()) {
      if((this.timeshetStatus === 'Pagato' && this.currentTimesheet.state === '4' &&  this.getRoleFromLocalStorage() !== '0')){
        this.toastrService.info('Impossibile eliminare');
      }else{
        if(eventToUpdate.title === "TRASFRIMB"){
          this.timesheetaddtrasfService.deleteTrasferta( this.currentTimesheet.id , eventToUpdate , eventToUpdate.start).subscribe(
            res =>{ 
              this.loadCurrentMonthTimesheet(res["data"]);
            }
          );
        }else{
          this.events = this.events.filter((iEvent) => iEvent !== eventToUpdate);
        }
        this.isTimesheetSave = false;
      }
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
      trasferte: '',
      ticketnumber: '0',
      state: '0',
    };
    return timesheet;
  }

  openAddEventDialog() {
    this.assignedActivities.map(cus => cus['cus'])
    if (this.checkIfCanModify()) {
      const dialogRef = this.dialog.open(TimesheetAddEventComponent, {
        width: '600px',
        data: {
          date: this.viewDate,
          eventsList: this.events,
          activityList: this.assignedActivities,
          internalsActivitiesList : this.assignedInternalsActivities,
        },
      });
      dialogRef.afterClosed().subscribe(
        (res) => {
        if(res){
          console.log("resopenAddEventDialog" , res)
          if (res.data !== 'close') {
            const event: NewCalendarEvent = {
              title: res.data.contractCode,
              start: new Date(res.data.eventDate),
              nOre: res.data.numeroOre,
              actions: this.actions,
              codiceFatt: res.data.codiceFatturazione,
              numProtocollo: res.data.numProtocollo,
              activityId: res.data.activityId,
              customerId: res.data.customerId,
              smartWorking: +res.data.smartWorking,
              contractCode: res.data.contractCode,
              internalId: res.data.internalId ,
              internalName: res.data.internalName,
              internalRuolo: res.data.internalRuolo,
              destinazione: res.data.destinazione,
              customerName: res.data.contractCode === 'LAVORO' ||  res.data.contractCode === 'PARTIME' ? this.assignedActivities.map(cus => cus['cus']).filter(cusName => res.data.customerId === cusName['id'])[0]['name'] : '',
              cssClass: this.selectCssIcon(res.data),
              draggable: this.isDraggable(res.data),
            };  
            console.log("event" , event)
            this.events = [...this.events, event];
            this.currentTimesheet.dayjson = [...this.events , event]
            console.log("this.events" , this.events)
            this.isTimesheetSave = false;
            this.toastrService.success('Evento aggiunto temporaneamente. Salvare il timesheet per applicare le modifiche');
          } else {
            this.toastrService.error('Nessuna operazione effettuata');
          }
        }else{
          this.toastrService.error('Nessuna operazione effettuata');
        }
      });
    } else {
      this.checkIfCanModifyErrorMsg();
    }
  }

  openAddTrasfDialog(){
    this.assignedActivities.map(cus => cus['cus']);
    //console.log(this.assignedActivities);
    if (this.checkIfCanModify()) {
      this.saveCurrentTimesheet();
      const dialogRef = this.dialog.open(TimesheetAddTrasfComponent , {
        width: '600px',
        data: {
         currentValueDay :this.currentValueDay,
         date: this.viewDate,
         activityList: this.assignedActivities,
         timesheet: this.currentTimesheet,
         loggeduserid: this.authenticationService.currentUserValue.id,
        },
      })
      dialogRef.afterClosed().subscribe(res => {
        if(res){
          if (res.data !== 'close') {
            this.toastrService.success('Trasferta aggiunta. Salvare il timesheet per applicare le modifiche');
            this.addTrasfertaInTime(res.timesheetId, res.trasferta, res.data)
          }else{
            this.toastrService.error('Nessuna operazione effettuata');
          }
        }else{
          this.toastrService.error('Nessuna operazione effettuata');
        }
      })
      
    } else {
      this.checkIfCanModifyErrorMsg();
    }
  }

  askToaddTrasfertaInTime() {
    this.showModalAddTrasf = true;
    console.log(this.currentTimesheet);
    if(!this.checkIfCurrentValueHasTrasf(this.currentValueDay)){
      this.alertFlagTrasf = true;
      this.confirmationMessage =
        'Per aggiungere una nuova trasferta, devi salvare il timesheet corrente, sei sicuro di voler salvare il timesheet ?';
    }else{
      this.alertFlagTrasf = false;
      this.confirmationMessage =
        'Trasferta gia presente nel giorno selezionato';
    }
  }

  checkIfCurrentValueHasTrasf(valueDay){
    let res : boolean = false
    if(valueDay.length > 0){
      for(let j : number = 0; j < valueDay.length; j ++){
        if((valueDay[j].title == "TRASFRIMB")){
              res = true;
              break;
            }
        }
    }
    return(res);
  }


  addTrasfertaInTime(timesheetId, trasferta, data){
    this.timesheetaddtrasfService.addTrasferta(timesheetId, trasferta, data).subscribe(
      res => {
          //console.log("resdata" , res["data"]);
          this.loadCurrentMonthTimesheet(res["data"]);
          this.saveCurrentTimesheet();
      });
    this.closeConfirmationModal();
  }


  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.refresh.next();
    //se sposta una trasferta salva
    if(event && (event.title === 'TRASFRIMB' && event.draggable === true)){
      //console.log("eventTimesChanged" , event);
      this.saveCurrentTimesheet()
    }
  }

  getIdFromLocalStorage() {
    const user: User = this.authenticationService.currentUserValue;
    if (user == null) {
      this.toastrService.error('getIdFromLocalStorage() -> null');
      this.router.navigate(['/home-page']);
      return null;
    }
    //console.log(user);
    return user.id;
  }

  getRoleFromLocalStorage() {
    const user: User = this.authenticationService.currentUserValue;
    return user.role;
  }
  /**
   * funzione che gestisce la possibilità o no di vedere i pulsanti di modifica eventi
   */
  checkIfCanModify() {
    const userRole = this.getRoleFromLocalStorage();
    if (this.isDisabled() || userRole == '0' ) {
      this.ismodifiable = true;
      return true;
    } else {
      this.ismodifiable = false;
      return false;
    }

  }

  /**
   * gestisce i messaggi di errore per capire la motivazione dell'impossibilità di modificare il timesheet
   */

  checkIfCanModifyErrorMsg() {
    if (this.currentTimesheet.state === '4') {
      this.toastrService.error(
        'impossibile modificare il timesheet: stato pagato'
      );
      return false;
    }
  }
  printEvents() {
    console.log(this.currentTimesheet);
    console.log(this.events);
  }

  loadCurrentMonthTimesheet(recivedTimesheet) {
    this.currentTimesheet = recivedTimesheet;
    const tmpEvents = JSON.parse(recivedTimesheet.dayjson);
    this.currentTimesheet.dayjson = []; // non e' sbagliato serve per eliminare le schifezze che potrebbero essere rimaste
    console.log("currentTimesheet" , this.currentTimesheet);
    tmpEvents.forEach((element) => {
      const newEvent = {
        title: element.title,
        start: new Date(element.start),
        nOre: element.nOre,
        actions: element.title != "TRASFRIMB" ? this.actions : this.actionsOnlyDel ,
        codiceFatt: element.codiceFatt,
        numProtocollo: element.numProtocollo,
        activityId: element.activityId,
        customerId: element.customerId,
        smartWorking: +element.smartWorking,
        ticketnumber: element.ticketnumber,
        customerName: element.customerName,
        internalId: element.internalId,
        internalName: element.internalName,
        internalRuolo: element.internalRuolo,
        destinazione: element.destinazione,
        cssClass: this.selectCssIcon(element),
        draggable: this.isDraggable(element),
      };
      this.currentTimesheet.dayjson = [
        ...this.currentTimesheet.dayjson,
        newEvent,
      ];
       this.events = this.currentTimesheet.dayjson
    });

    console.log("dayjson" ,  this.currentTimesheet.dayjson);
    this.currentTimesheet.trasferte = JSON.parse(recivedTimesheet.trasferte);  //TODO attenzione a questo jsonparse potrebbe dover cambiare
    console.log("workeddays" , this.currentTimesheet.workeddays)
    console.log("trasferteLength" , this.currentTimesheet.trasferte.length)

    //aggiorno Distaccato
    this.distaccatoPresso = this.currentTimesheet.distaccato;

    //controllo se le trasferte sono maggiori dei giorni lavorati
    if(this.currentTimesheet.workeddays < this.currentTimesheet.trasferte.length ){
     this.trasferteStatus = true;
    }
    else{
      this.trasferteStatus = false;
    }
    this.updateStateLabel();
  }

  updateStateLabel() {
    this.currentTimesheet.state = String(this.currentTimesheet.state);
    //console.log(this.currentTimesheet.state);
    this.currentTimesheet.state = this.currentTimesheet.state;
    console.log("currentTimesheetState" , this.currentTimesheet.state)
    switch (this.currentTimesheet.state) {
      case '0':
        this.disableAggiungiEvento = false;
        this.disableSalva = false;
        this.disableAccettaComeUtente = true;
        this.disableAccettaComeAmministratore = true;
        this.disableAccettaComeFinally = true;
        this.disableAzeraStato = true;
        this.disableCalcolaTrasferte = true;
        this.timeshetStatus = 'Non inizializzato';
        break;

      case '1':
        this.disableAggiungiEvento = false;
        this.disableSalva = false;
        this.disableAccettaComeUtente = false;
        this.disableAccettaComeAmministratore = true;
        this.disableAccettaComeFinally = true;
        this.disableAzeraStato = true;
        this.disableCalcolaTrasferte = true;
        this.timeshetStatus = 'Modificabile';
        break;

      case '2':
        if ( this.getRoleFromLocalStorage() === '0' || this.getRoleFromLocalStorage() === '1' ) {
          this.disableSalva = false;
          this.disableAggiungiEvento = false;
          this.disableAzeraStato = false;
        } else {
          this.disableSalva = true;
          this.disableAggiungiEvento = true;
          this.disableAzeraStato = true;
        }
        this.disableAccettaComeUtente = true;
        this.disableAccettaComeAmministratore = false;
        this.disableAccettaComeFinally = true;

        this.disableCalcolaTrasferte = false;
        this.timeshetStatus = 'Accettato dal dipendente';
        break;

      case '3':
        if ( this.getRoleFromLocalStorage() === '1' || this.getRoleFromLocalStorage() === '0' ) {
          this.disableSalva = false;
          this.disableAggiungiEvento = false;
        } else {
          this.disableSalva = true;
          this.disableAggiungiEvento = true;
        }
        this.disableCalcolaTrasferte = false;
        this.disableAccettaComeUtente = true;
        this.disableAccettaComeAmministratore = true;
        this.disableAccettaComeFinally = false;
        if (this.getRoleFromLocalStorage() === '0'){
          this.disableAzeraStato = false;
        } else {
          this.disableAzeraStato = true;
        }
        this.disableCalcolaTrasferte = false;
        this.veroDisableFinally = false;
        this.timeshetStatus = 'Accettato dall\'amministrazione';

        //BOTTONE SALVA
        //se Admin(1) o User(2) non deve vedere salva(caso 4)
        if((this.getRoleFromLocalStorage() === '1') || (this.getRoleFromLocalStorage() === '2')){
          this.disableSalva = true;
        }else{
          this.disableSalva = false;
        }

        //BOTTONE AGGIUNGI EVENTO
        //se Admin(1) o User(2) non deve vedere salva(caso 4)
        if((this.getRoleFromLocalStorage() === '1') || (this.getRoleFromLocalStorage() === '2')){
          this.disableAggiungiEvento = true;
        }else{
          this.disableAggiungiEvento = false;
        }

        break;

      case '4':
        this.disableAccettaComeUtente = true;
        this.disableAccettaComeAmministratore = true;
        this.disableAccettaComeFinally = false;
        this.veroDisableFinally = true;
        /*if ( this.getRoleFromLocalStorage() === '0') {
          this.disableAzeraStato = false;
          this.disableSalva = false;
        } else {
          this.disableSalva = true;
          this.disableAzeraStato = true;
        }*/
        this.timeshetStatus = 'Pagato';

        //BOTTONE SALVA
        //se Admin(1) o User(2) non deve vedere salva(caso 4)
        if((this.getRoleFromLocalStorage() === '1') || (this.getRoleFromLocalStorage() === '2')){
          this.disableSalva = true;
        }else{
          this.disableSalva = false;
        }

        //BOTTONE AGGIUNGI EVENTO
        //se Admin(1) o User(2) non deve vedere salva(caso 4)
        if((this.getRoleFromLocalStorage() === '1') || (this.getRoleFromLocalStorage() === '2')){
          this.disableAggiungiEvento = true;
        }else{
          this.disableAggiungiEvento = false;
        }

        //BOTTONE AZZERA STATO
        //Se Admin(1) o User(2) no deve vedere azzera stato (caso 4)
        //se SuperAdmin(0), Admin(1) o User(2) no deve vedere azzera stato (caso 4)
        if((this.getRoleFromLocalStorage() === '0') || (this.getRoleFromLocalStorage() === '1') || (this.getRoleFromLocalStorage() === '2')){
          this.disableAzeraStato = true;
        }else{
          this.disableAzeraStato = false;
        }


        break;13
    }
    this.checkIfCanModify();
  }

  exportInExcel() {
    const month = this.viewDate.getMonth();
    const year = this.viewDate.getFullYear();
    const userid = this.currentTimesheetUserId;
    console.log(this.currentUserInfo);
    const cognome = this.currentUserInfo[0]["anad"]["surname"]; //TODO togliere lo zero da tutte ste chioamate
    const nomefile = 'Timesheet' + '_' + cognome + '_' + month + '_' + year + '.Xlsx';
    this.fileservice
      .downloadSingleTimesheetFile(month, year, userid)
      .subscribe((response) => {
        let blob: any = new Blob([response], {
          type:
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=utf-8',
        });
        const url = window.URL.createObjectURL(blob);
        // window.open(url);
        // window.location.href = response.url;
        fileSaver.saveAs(blob, nomefile);
      }),
      (error) => {
        console.log('Error downloading the file', error);
      },
      () => {
        console.info('File downloaded successfully');
      };
  }
  calcTrasferte() {
    console.log(this.currentTimesheet.trasferte);
    const dialogRef = this.dialog.open(TimesheetTrasferteModalComponent, {
        width: '600px',

        data: {
          timesheet: this.currentTimesheet,
          loggeduserid: this.authenticationService.currentUserValue.id,
        },
      });
    dialogRef.afterClosed().subscribe(
      (res) => {
        console.log(this.currentTimesheet);
        if ( res === undefined ) {
          this.toastrService.info('Nessuna Operazione effettuata');
        } else {
          this.currentTimesheet.trasferte = res.data;
          //console.log("acivalue to change", res.acivalue);
          //console.log("diaria to change", res.diaria);
          this.currentTimesheet.montlydiaria = res.diaria;
          this.currentTimesheet.montlyacivalue = res.acivalue;
          this.currentTimesheet.rimborsotrasferte = res.rimborsotrasferte;
          this.currentTimesheet.rimborsotarget = res.rimborsotarget;
          this.saveCurrentTimesheet();
          this.toastrService.success('Trasferte Salvate');
        }
      });
  }

  ///////////////////////////////////////////////////////////////////
  // confirmation modal function
  ///////////////////////////////////////////////////////////////////

  askTosaveCurrentTimesheet() {
    this.showModalSave = true;
    console.log(this.currentTimesheet);
    this.confirmationMessage =
      'Vuoi salvare il timesheet ?';
  }

  saveCurrentTimesheet() {
    const month = this.viewDate.getMonth();
    const year = this.viewDate.getFullYear();
    this.currentTimesheet.dayjson = this.events;
    const logged = this.authenticationService.currentUserValue.id;
    //this.currentTimesheet.trasferte = JSON.parse(this.currentTimesheet.trasferte);
    console.log("trasferte" ,this.currentTimesheet.trasferte);
    this.timesheetService.saveTimesheet(this.currentTimesheet, logged).subscribe(
      (result) => {
        if (result.status === 'done') {
          this.isTimesheetSave = true;
          console.log("currentTimesheet" ,this.currentTimesheet);
          this.loadCurrentMonthTimesheet(result.data);
          this.toastrService.success('Timesheet salvato');
          this.updateStateLabel();
          console.log('saved');
        } else {
          console.log('error');
          this.toastrService.error(result.message);
          return false;
        }
      },
      (error) => {
        this.toastrService.error(error.message);
        return false;
      }
    );
    this.closeConfirmationModal();
    
    if(this.timesheetSaved){
      this.isTimesheetSave = true;
      this.askToAcceptAsUser()
    }
      
  }

  askToAcceptAsUser() {
    this.showAcceptAsUser = true;
    console.log(this.currentTimesheet);
    if(this.currentTimesheet.dayjson.length > 0){
      this.alertFlagUser = true;
      if(this.isTimesheetSave != false){
        this.timesheetSaved = false;
        this.confirmationMessage =
        'Vuoi accettare il timesheet corrente e inviarlo all amministrazione? Una volta inviato non potrai piu modificarlo. ';
      }else{
        this.timesheetSaved = true;
        this.confirmationMessage =
        'Il timesheet deve essere salvato prima di essere accetato, vuoi salvare ?';
      }
    }else{
      this.alertFlagUser = false;
      this.confirmationMessage =
        'Il timesheet non può essere vuoto'
    }
  }

  acceptAsUser() {
    const month = this.viewDate.getMonth();
    const year = this.viewDate.getFullYear();
    const userid = this.currentTimesheetUserId;
    this.timesheetService.acceptAsUser(month, year, userid).subscribe(
      (result) => {
        if (result.status === 'done') {
          console.log(result.data);
          this.loadCurrentMonthTimesheet(result.data);
          this.toastrService.success('Timesheet accettato dall utente ');
          console.log(this.currentTimesheet);
          this.events = this.currentTimesheet.dayjson;
          this.updateStateLabel();
        } else {
          this.toastrService.error(result.message);
        }
      },
      (error) => {
        this.toastrService.error(error);
      }
    );
    this.closeConfirmationModal();
  }

  askToAcceptAsAdmin() {
    this.showAcceptAsAdmin = true;
    console.log(this.currentTimesheet);
    if(this.currentTimesheet.workeddays < this.currentTimesheet.trasferte.length ){
      this.alertFlagAdmin = false;
      this.confirmationMessage =
      'I giorni lavorati sono minori delle trasferte';
    }else{
      this.alertFlagAdmin = true;
      this.confirmationMessage =
      'Vuoi confermare il timesheet ? Una volta accettato non sara piu possibile cambiarlo.';
      console.log('askToAcceptAsAdmin');
    }
  }

  acceptAsAdmin() {
    const month = this.viewDate.getMonth();
    const year = this.viewDate.getFullYear();
    const userid = this.currentTimesheetUserId;
    this.timesheetService.acceptAsAdmin(month, year, userid).subscribe(
      (result) => {
        if (result.status === 'done') {
          this.loadCurrentMonthTimesheet(result.data);
          this.toastrService.success(
            'Timesheet accettato dall amministrazione '
          );
          this.updateStateLabel();
        } else {
          this.toastrService.error(result.message);
        }
      },
      (error) => {
        this.toastrService.error(error);
      }
    );
    this.closeConfirmationModal();
  }

  askToAcceptAsFinally() {
    this.showAcceptAsFinally = true;
    console.log(this.currentTimesheet);
    this.confirmationMessage =
      'Vuoi confermare definitivamente il timesheet? Una volta modificato non sara piu possibile modificarlo';
    console.log('askToAcceptAsUser');
  }

  acceptAsFinally() {
    const month = this.viewDate.getMonth();
    const year = this.viewDate.getFullYear();
    const userid = this.currentTimesheetUserId;
    const loggeduserid = this.authenticationService.currentUserValue.id;
    this.timesheetService.acceptAsFinally(month, year, userid, loggeduserid).subscribe(
      (result) => {
        if (result.status === 'done') {
          this.loadCurrentMonthTimesheet(result.data);
          this.toastrService.success('Timesheet accettato definitivamente ');
          this.updateStateLabel();
        } else {
          this.toastrService.error(result.message);
        }
      },
      (error) => {
        this.toastrService.error(error);
      }
    );
    this.closeConfirmationModal();
  }

  askToResetStatus() {
    this.showResetStatus = true;
    console.log(this.currentTimesheet);
    this.confirmationMessage =
      'Vuoi rendere nuovamente modificabile il timesheet? Proseguendo '
    console.log('askToAcceptAsUser');
  }

  ResetStatus() {
    const month = this.viewDate.getMonth();
    const year = this.viewDate.getFullYear();
    const userid = this.currentTimesheetUserId;
    const loggeduserid = this.authenticationService.currentUserValue.id;
    this.timesheetService.resetState(month, year, userid, loggeduserid).subscribe(
      (result) => {
        if (result.status === 'done') {
          this.loadCurrentMonthTimesheet(result.data);
          this.toastrService.success('Timesheet torna modificabile');
          this.updateStateLabel();
        } else {
          this.toastrService.error(result.message);
        }
      },
      (error) => {
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
    this.showModalAddTrasf = false;
  }

  selectCssIcon(event){
    let res ="";
    if(this.authenticationService.currentUserValue.isadmin != "2"){
      if(event.contractCode === "MALATT" || event.title === "MALATT"){
        res = "malattia";
      }
      if((event.contractCode === "LAVORO"  || event.contractCode === "PARTIME") ||
        (event.title === "LAVORO"  || event.title === "PARTIME") || 
        (event.contractCode === "SEDE" || event.title === "SEDE")){
        if(event.codiceFatturazione === "TR" || event.codiceFatt === "TR"){
          res = "macchinina";
        }
      }
      if(event.title === "TRASFRIMB"  || event.contractCode === "TRASFRIMB"){
        res ="macchinina3"
      }
    }
    return(res)
  }

  isDraggable(event){
    let res = false;
    if(this.authenticationService.currentUserValue.isadmin == "0"){
      if(event.title === "TRASFRIMB"  || event.contractCode === "TRASFRIMB"){
        res = true;
      }
    }
    return res;
  }

}
