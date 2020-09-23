import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef , } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { NgbDatepicker, NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDatepickerModule } from '@angular/material/datepicker';
// import { NgbActiveModal , NgbDatepicker, NgbDate, NgbModule  } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-event-modal',
  templateUrl: './add-event-modal.component.html',
  styleUrls: ['./add-event-modal.component.css']
})

export class AddEventModalComponent implements OnInit   {

  minDate = {year: 2020, month: 7, day: 1};
  maxDate = {year: 2020, month: 7, day: 30};

  name: string;
  value: number;
  submitted:boolean = false;

  profileForm :FormGroup;
  selectedContractCod = '';
  errorMessage = '';

  insertMalattia = false;
  insertNumeroOre = false;
  insertLavoro = false;
  assignedact = 0;
  allComplete = false;
  selectedValue = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddEventModalComponent>,
    private formBuilder: FormBuilder) { }



  ngOnInit() {
    console.log(this.data);
    this.assignedact = this.data.activityList;
    if ( this.data.isEdit ) {
      console.log(this.data.toEdit);
      const tmp = this.data.toEdit;
      this.selectedContractCod = tmp.title;
      this.profileForm = this.formBuilder.group({
        numeroOre: [tmp.nOre, [Validators.required]],
        contractCode: [tmp.title, [Validators.required]],
        eventDate: [this.data.date, [Validators.required]],
        numProtocollo : [this.data.nProtocollo, [Validators.required]],
        codiceFatturazione: [tmp.codiceFatt, [Validators.required]],
        activityId: [tmp.activityId, [Validators.required]],
        smartWorking: ['0', [Validators.required]],
      });
      this.selectVisibleComponent(tmp.title);
      this.selectedValue = tmp.activityId;
    } else {
      this.profileForm = this.formBuilder.group({
        numeroOre: [null, [Validators.required]],
        contractCode: [null, [Validators.required]],
        eventDate: [this.data.date, [Validators.required]],
        numProtocollo : [this.data.date, [Validators.required]],
        codiceFatturazione: [null, [Validators.required]],
        activityId: ['0', [Validators.required]],
        smartWorking: ['0', [Validators.required]],
      });
    }





  }

  get f() { return this.profileForm.controls; }

  submit() {
    console.log(this.profileForm.invalid);
    if (this.profileForm.invalid) {

      return;
    }
    this.dialogRef.close({ data: this.profileForm.value });
    /*this.submitted = true;

    console.log(this.profileForm.value.eventDate);
    if (this.profileForm.invalid) {

      return;
    }
    // console.warn(this.profileForm.value);
    this.activeModal.close(this.profileForm.value);*/
  }

  close() {
    this.dialogRef.close({ data: 'close'});
  }


  valueChanged(e) {
    this.value = e.target.value;
  }

  onChangeSelect($event){
    const value = $event.target.value;
    this.selectVisibleComponent(value);
  }

  selectVisibleComponent(eventTitle){
    switch (eventTitle) {
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
  onChangeFattSelect(event){}
  aggiungiButtonDisabled(){}
  onDateChange(event){}
}
