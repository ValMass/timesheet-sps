import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
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

export class AddEventModalUserComponent implements OnInit   {

  minDate = {year: 2020, month: 7, day: 1};
  maxDate = {year: 2020, month: 7, day: 30};

  name: string;
  value: number;
  submitted:boolean = false;

  profileForm :FormGroup;

  insertLavoro = false;
  insertMalattia = false;
  insertNumeroOre = false;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddEventModalUserComponent>,
    private formBuilder: FormBuilder) { }



  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      numeroOre: [null, [Validators.required]],
      contractCode: [null, [Validators.required]],
      eventDate: [this.data.date, [Validators.required]],
      codiceFatturazione: ['00', [Validators.required]],
      numProtocollo: ['00', [Validators.required]]
    });




  }

  get f() { return this.profileForm.controls; }

  submit() {
    this.submitted = true;
    console.log(this.profileForm.invalid);
    if (this.profileForm.invalid) {

      return;
    }
    this.dialogRef.close({ data: this.profileForm.value });
  }

  close() {
    this.dialogRef.close({ data: 'close'});
  }

  valueChanged(e) {
    this.value = e.target.value;
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
}
