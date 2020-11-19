import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CalendarEvent } from 'angular-calendar';
import { ToastrService } from 'ngx-toastr';

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
  assignedact: any[];
  customerList: any[];
  insertLavoro = true;
  insertMalattia = false;
  insertNumeroOre = false;
  allComplete : boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<TimesheetAddEventComponent>,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      numeroOre: ['8', [Validators.required]],
      contractCode: ['LAVORO', [Validators.required]],
      eventDate: [this.data.date, [Validators.required]],
      codiceFatturazione: ['01', [Validators.required]],
      numProtocollo: ['00', [Validators.required]],
      activityId: ['0', [Validators.required]],
      smartWorking: [this.isChecked(), [Validators.required]],
      customerId: ['', [Validators.required]],
    });

    const check = new Set();
    this.customerList = this.data.activityList
      .map((el: Object) => el['cus'])
      .filter(item => !check.has(item['id']) && check.add(item['id']));

    this.profileForm.get('customerId').valueChanges
      .subscribe(customerId => {
        this.assignedact = this.data.activityList
          .map((el: Object) => el['act'])
          .filter((item: Object) => item['customerid'] === customerId);
      });

    if (this.data.type === 'edit') {
      this.profileForm.patchValue(
        {
          smartWorking: +this.data.event.smartWorking,
          codiceFatturazione: this.data.event.codiceFatt,
          numeroProtocollo: this.data.event.nProtocollo,
          numeroOre: this.data.event.nOre,
          activityId: this.data.event.activityId,
          customerId: this.data.event.customerId,
          contractCode: this.data.event.title,
        },
      );
    }
  }

  get f() { return this.profileForm.controls; }

  submit() {
    this.submitted = true;
    /*console.log(  "allComplete B" , this.allComplete);
    if ( this.allComplete === true) {
      console.log( "allComplete A");
      const tmp = { smartWorking: 1 };
      this.profileForm.patchValue(tmp);
    }*/
    console.log('invalid :' + this.profileForm.invalid);
    console.log(this.profileForm.value);
   // if (this.profileForm.invalid) {

    //  return;
    //}
    if(this.profileForm.value.contractCode != null && this.profileForm.value.eventDate != null)
    {
      if(this.profileForm.value.contractCode == 'MALATT'){
        if (this.profileForm.value.numProtocollo != '00') {
          this.dialogRef.close({ data: this.profileForm.value });
        }
      }
      else{
        if(this.profileForm.value.contractCode != 'LAVORO'
             && this.profileForm.value.contractCode != 'SEDE'
                && this.profileForm.value.contractCode != 'PARTIME'){
          this.dialogRef.close({ data: this.profileForm.value });
        }
        else{
          if(this.profileForm.value.codiceFatturazione != '00'
              && this.profileForm.value.activityId != undefined ){
            this.dialogRef.close({ data: this.profileForm.value });
          }
        }
      }
    }
  }

  close() {
    this.dialogRef.close({ data: 'close'});
  }

  onDateChange(event) {
    this.dateObj = new Date(event.value);
    console.log(this.dateObj);
    this.getEventsForDate(this.dateObj);
    this.checkIfThisDayIsBusy();
  }


  onChangeSelect($event){
    const value = $event.target.value;
    switch (value) {
      case 'LAVORO':
      case 'SEDE':
      case 'PARTIME':
        this.insertLavoro = true;
        this.insertNumeroOre = false;
        this.insertMalattia = false;
        break;



      case 'MALATT':
        this.insertLavoro = false;
        this.insertNumeroOre = false;
        this.insertMalattia = true;
        const patch = {
          codiceFatturazione: '00',
          numeroOre: 8,
        };

        this.profileForm.patchValue(patch);
        break;

      case 'PERMNON':
      case 'PERMESS':
      case 'MATALA':

        this.insertLavoro = false;
        this.insertNumeroOre = true;
        this.insertMalattia = false;
        const patch2 = {
          codiceFatturazione: '00',
          numProtocollo: '00',
        };

        this.profileForm.patchValue(patch2);
        break;


      default:
        this.insertLavoro = false;
        this.insertNumeroOre = false;
        this.insertMalattia = false;
        const patch3 = {
          codiceFatturazione: '00',
          numProtocollo: '00',
          numeroOre: 8
        };
        this.profileForm.patchValue(patch3);

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
  oneEventThisDay(){
    const event = this.eventsSelected.pop();
    console.log(event.title);
    if ( event.title === 'MALATT') {
      //this.aggiungiButtonDisabled = true;
      this.errorMessage = 'Giorno di malattia';
    }
    if ( event.title === 'MATRIMO') {
      //this.aggiungiButtonDisabled = true;
      this.errorMessage = 'Giorno di Matrimonio';
    }
  }

  getEventsForDate(selectedDate){
    this.eventsPassed.forEach(event => {
      console.log(event.start.getDate());
      const eventDay = event.start.getDate();
      const selectedDay = selectedDate.getDate();
      if (eventDay === selectedDay ) {
        console.log("event " + eventDay);
        console.log("selectedDate " + selectedDay);
        this.eventsSelected.push(event);
      }
    });
    console.log(this.eventsSelected);
  }

  onChangeFattSelect($event){

  }
  valueChanged(e) {
    if ((e.target.value > 8) || (e.target.value < 0) ){
      const tmp = { numeroOre: 0 };
      this.profileForm.patchValue(tmp);
      this.toastrService.error("inserisci da 1 a 8 ore");
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
}
