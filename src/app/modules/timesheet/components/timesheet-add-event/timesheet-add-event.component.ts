import { User } from '@app/models/user';
import { AuthenticationService } from '@app/services/authentication.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CalendarEvent } from 'angular-calendar';
import { ToastrService } from 'ngx-toastr';
import { TimesheetaddeventService } from '../../services/timesheetaddevent.service';

@Component({
  selector: 'app-timesheet-add-event',
  templateUrl: './timesheet-add-event.component.html',
  styleUrls: ['./timesheet-add-event.component.css']
})
export class TimesheetAddEventComponent implements OnInit {

  name: string;
  value: number;
  canAdd = false;
  dateObj: any;
  submitted: boolean = false;
  eventsPassed: CalendarEvent[] = [];
  eventsSelected: CalendarEvent[] = [];
  profileForm: FormGroup;
  aggiungiButtonDisabled: boolean = false;
  errorMessage = "";
  assignedact: any[]= [];
  customerList: any[]= [];
  insertLavoro = true;
  insertMalattia = false;
  insertNumeroOre = false;
  insertSmartWorking = true;
  insertSede = false;
  allComplete: boolean = true;
  internalsActivitiesList: any;
  ruoloInternal: string = '';
  nomeInternal: string = '';
  officeslist: any[] = [];
  loadOffice: boolean = false;
  flagShowAttDest: boolean = true;
  isPagato : boolean = false;
  multiPickList : any = [];
  multiPickListEnable : boolean = false;
  ruolo : any;
  tipoAttivita : string = "";
  activityList : any = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<TimesheetAddEventComponent>,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private service: TimesheetaddeventService,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    console.log("data", this.data)
    this.profileForm = this.formBuilder.group({
      numeroOre: ['8', [Validators.required]],
      contractCode: ['LAVORO', [Validators.required]],
      eventDate: [this.data.date, [Validators.required]],
      codiceFatturazione: ['01', [Validators.required]],
      numProtocollo: ['00', [Validators.required]],
      destinazione: ['', [Validators.required]],
      activityId: ['0', [Validators.required]],
      customerId: ['', [Validators.required]],
      internalId: ['0', [Validators.required]],
      internalName: ['', [Validators.required]],
      internalRuolo: ['', [Validators.required]],
      smartWorking: [this.isChecked(), [Validators.required]],
      atyid: ['0', [Validators.required]],
      atydescr: ['', [Validators.required]],
      atyname: ['', [Validators.required]],
    });
    
    //se il multipick è abilitato l'utente non può modificare la data
    this.multiPickList = this.data.multiPickList;

    //ruolo -> 0 superadmin , 1 admin , 2 utente normale
    this.ruolo =  this.getRoleFromLocalStorage();

    if(this.multiPickList && this.multiPickList.length > 0){
      this.multiPickListEnable = true;
    }

    const check = new Set();
    this.customerList = this.data.activityList
      .map((el: Object) => el['cus'])
      .filter(item => !check.has(item['id']) && check.add(item['id']));

    this.internalsActivitiesList = this.data.internalsActivitiesList;

    this.profileForm.get('customerId').valueChanges
      .subscribe(customerId => {
        this.assignedact = this.data.activityList
          .map((el: Object) => el['act'])
          .filter((item: Object) => item['customerid'] === customerId);
      });
    
    this.activityList = this.data.activityList;

    if (this.data.type === 'edit') {
      this.isPagato = this.data.readonlyEdit;
      if (this.data.event.codiceFatt === "TR") {
        this.loadOffice = true;
      }
      if (this.data.event.title === 'LAVORO' || this.data.event.title === 'SEDE' ||this.data.event.title === 'PARTIME') {
        this.flagShowAttDest = false;
      }
      this.getoffices(this.data.event.customerId , this.data.event.title);
      this.ruoloInternal = this.data.event.internalRuolo;
      this.profileForm.patchValue(
        {
          smartWorking: +this.data.event.smartWorking,
          codiceFatturazione: this.data.event.codiceFatt,
          numProtocollo: this.data.event.numProtocollo,
          numeroOre: this.data.event.nOre,
          activityId: this.data.event.activityId,
          customerId: this.data.event.customerId,
          contractCode: this.data.event.title,
          internalId: this.data.event.internalId,
          internalName: this.data.event.internalName,
          internalRuolo: this.data.event.internalRuolo,
          destinazione: this.data.event.destinazione,
          atyid:  this.data.event.atyid,
          atydescr:  this.data.event.atydescr,
          atyname:  this.data.event.atyname,
        },
      );
      //passo il valore del title a onChangeSelect
      console.log(this.data.event.title);
      this.onChangeSelect(this.data.event.title)
    }
  }

  get f() { return this.profileForm.controls; }

  submit() {
    let listaDate : any[] = [];
    this.submitted = true;
    /*console.log(  "allComplete B" , this.allComplete);
    if ( this.allComplete === true) {
      console.log( "allComplete A");
      const tmp = { smartWorking: 1 };
      this.profileForm.patchValue(tmp);
    }*/

    // la mat-checkbox smartworking resetta i dati internalName e Internalruolo a "" per rivalorizzare
    // questi campi ho valorizzato una variabile di appoggio e se nel caso l'id è valorizzato 
    // ma i suddetti campi sono vuoti gli riassegna i valori che avevano
    if ((this.profileForm.value.internalName == "") &&
      (this.profileForm.value.internalRuolo == "") &&
      (this.profileForm.value.internalId > 0)) {
      this.profileForm.value.internalName = this.nomeInternal;
      this.profileForm.value.internalRuolo = this.ruoloInternal;
    }

    //se il multi pick è attivo ed è stata passata una lista di date ritornare quella lista
    //se invece non è cosi ritorna la data scelta dall'utente 
    if(this.multiPickListEnable){
      this.multiPickList.forEach(element => {
        listaDate.push(element)
      });
    }else{
      listaDate.push(this.profileForm.value.eventDate)
    }
    
    if ((this.profileForm.value.contractCode != null)
      && (this.profileForm.value.numeroOre > "0" || this.profileForm.value.numeroOre > 0)) {
      if (this.profileForm.value.contractCode == 'MALATT') {
        if (this.profileForm.value.numProtocollo != '00') {
          this.dialogRef.close({ data: this.profileForm.value , listaDate : listaDate});
        }
      }
      else {
        if (this.profileForm.value.contractCode != 'LAVORO'
          && this.profileForm.value.contractCode != 'SEDE'
          && this.profileForm.value.contractCode != 'PARTIME'
          && (this.profileForm.value.numeroOre > 0)
          && (this.profileForm.value.numeroOre != null)) {
          this.dialogRef.close({ data: this.profileForm.value  , listaDate : listaDate});
        }
        else {
          if ((this.profileForm.value.contractCode == 'SEDE')
            && (this.profileForm.value.codiceFatturazione != null)
            && (this.profileForm.value.customerId == 1)
          ) {
            if (this.profileForm.value.internalId > 0 && this.profileForm.value.internalId != null 
              && this.profileForm.value.internalId != "") {
                if (this.profileForm.value.codiceFatturazione == "TR") {
                  if (this.profileForm.value.destinazione != null && this.profileForm.value.destinazione != "") {
                    this.dialogRef.close({ data: this.profileForm.value  , listaDate : listaDate });
                  }
                } else {
                  if (this.profileForm.value.codiceFatturazione != "TR") {
                    this.dialogRef.close({ data: this.profileForm.value   , listaDate : listaDate});
                  }
                }
            }
          } else {
            if (
              (this.profileForm.value.codiceFatturazione != '00')
              && (this.profileForm.value.activityId > 1)
              && (this.profileForm.value.activityId != null)
              && (this.profileForm.value.customerId > 1)
              && (this.profileForm.value.customerId != null)
            ) {
              if (this.profileForm.value.codiceFatturazione == "TR") {
                if (this.profileForm.value.destinazione != null && this.profileForm.value.destinazione != "") {
                  this.dialogRef.close({ data: this.profileForm.value  , listaDate : listaDate});
                }
              } else {
                if (this.profileForm.value.codiceFatturazione != "TR") {
                  this.dialogRef.close({ data: this.profileForm.value  , listaDate : listaDate});
                }
              }
            }
          }
        }
      }
    }
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

  //Ho diviso "onChangeSelect" con questa funzione prende il value dell'Evento che poi passera a onChangeSelect
  onChangeSelectIfEvent($event) {
    const value = $event.target.value;
    
    //pulisco la destinazione e codice fatturazione nel caso si passa da SEDE a LAVORO 
    this.profileForm.patchValue({
      destinazione : '' ,  
      codiceFatturazione: '01', 
      smartWorking: false,
    });

    //aggiorno anche il flag che si occupa della visibilità di attivita 
    this.flagShowAttDest = true;
    this.ruoloInternal = '';
    
    this.onChangeSelect(value);
  }

  onChangeSelect(value) {
    switch (value) {
      case 'LAVORO':
      case 'PARTIME':
        this.insertSede = false;
        this.insertLavoro = true;
        this.insertNumeroOre = false;
        this.insertMalattia = false;
        this.insertSmartWorking = true;
        const patch = {
          internalId : '',
          internalRuolo: '',
          internalName: '',
        }
        this.profileForm.patchValue(patch);
        break;

      case 'SEDE':
        this.insertSede = true;
        this.insertLavoro = false;
        this.insertNumeroOre = true;
        this.insertMalattia = false;
        this.insertSmartWorking = true;
        const patch1 = {
          activityId: '',
          customerId: 1,
          atyid: "0",
          atydescr:"",
          atyname: "",
        };

        this.profileForm.patchValue(patch1);
        break;

      case 'MALATT':
        this.insertSede = false;
        this.insertLavoro = false;
        this.insertNumeroOre = false;
        this.insertMalattia = true;
        this.insertSmartWorking = false;
        const patch2 = {
          activityId: '',
          customerId: 1,
          codiceFatturazione: '00',
          numeroOre: 8,
          internalName: '',
          internalRuolo: '',
          internalId: '',
          destinazione: '',
          atyid: "0",
          atydescr:"",
          atyname: "",
        };

        this.profileForm.patchValue(patch2);
        break;

      case 'PERMNON':
      case 'PERMESS':
      case 'MATALA':
      case 'FERIE':
        this.insertSede = false;
        this.insertLavoro = false;
        this.insertNumeroOre = true;
        this.insertMalattia = false;
        this.insertSmartWorking = false;
        const patch3 = {
          activityId: '',
          customerId: 1,
          codiceFatturazione: '00',
          numProtocollo: '00',
          internalName: '',
          internalRuolo: '',
          internalId: '',
          destinazione: '',
          atyid: "0",
          atydescr:"",
          atyname: "",
        };

        this.profileForm.patchValue(patch3);
        break;

      default:
        this.insertSede = false;
        this.insertLavoro = false;
        this.insertNumeroOre = false;
        this.insertMalattia = false;
        this.insertSmartWorking = false;
        const patch4 = {
          activityId: '',
          customerId: 1,
          codiceFatturazione: '00',
          numProtocollo: '00',
          numeroOre: 8,
          internalName: '',
          internalRuolo: '',
          internalId: '',
          destinazione: '',
          atyid: "0",
          atydescr:"",
          atyname: "",
        };
        this.profileForm.patchValue(patch4);

        break;
    }
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

  getoffices(id , tipoContratto) {
    if(tipoContratto != "SEDE"){
      this.getCustomerOffices(id);
    }else{
      this.getInternalOffices();
    }
  }

  getInternalOffices(){
    this.service.getAllOffices().subscribe(
      result => {
        console.log("resultInternal" , result)
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

  getCustomerOffices(id){
    this.service.getOfficesByCustomer(id).subscribe(
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

  customerListActions(customer) {
    const patch = {
      destinazione: '',
      activityId: '',
    };
    this.profileForm.patchValue(patch);
    if ((this.loadOffice) && (customer != undefined)) {
      this.getoffices(customer.id , customer.contractCode);
    } else {
      this.officeslist = [];
      this.profileForm.patchValue({
        atyid: "0",
        atydescr:"",
        atyname: "",
      });
    }

    if (customer != undefined) {
      this.flagShowAttDest = false;
    } else {
      this.flagShowAttDest = true;
    }

  }

  changeactivity(activity){
    if(activity != undefined){
      let res = this.activityList.find( element => activity === element["act"]);
      this.profileForm.patchValue({
        atyid: res["aty"].id,
        atydescr: res["aty"].descrizione,
        atyname: res["aty"].name,
      })
    } else {
      this.profileForm.patchValue({
        atyid: "0",
        atydescr:"",
        atyname: "",
      })
    }
  }

  onChangeFattSelect($event) {
    if ($event == "TR") {
      this.loadOffice = true;
      //se il customer è valorizzato prendo le destinazioni 
      if(this.profileForm.value.customerId != null){
        this.getoffices(this.profileForm.value.customerId , this.profileForm.value.contractCode);
      }
      this.profileForm.patchValue({
        smartWorking: false,
      })
    } else {
      this.loadOffice = false;
    }
  }
  valueChanged(e) {
    //cambio da 8 a 24 ore 
    if ((e.target.value > 24) || (e.target.value < 0)) {
      const tmp = { numeroOre: 0 };
      this.profileForm.patchValue(tmp);
      this.toastrService.error("inserisci da 1 a 24 ore");
    }
    this.value = e.target.value;
  }

  isChecked() {
    /*if (this.allComplete) {
      this.allComplete = false;
    } else {
      this.allComplete = true;
    }*/
    return (this.allComplete == true ? false : true);
  }

  selectedInternal($event) {
    if ($event != undefined) {
      this.profileForm.value.internalName = $event.inat.name;
      this.profileForm.value.internalRuolo = $event.rela.ruolo;
      this.nomeInternal = $event.inat.name;
      this.ruoloInternal = $event.rela.ruolo;
      this.flagShowAttDest = false;
  } else {
      this.profileForm.value.internalName = '';
      this.profileForm.value.internalRuolo = '';
      this.nomeInternal = '';
      this.ruoloInternal = '';
      this.flagShowAttDest = true;
      this.profileForm.patchValue({destinazione : ''})
    }
  }

  getRoleFromLocalStorage() {
    const user: User = this.authenticationService.currentUserValue;
    return user.role;
  }
}
