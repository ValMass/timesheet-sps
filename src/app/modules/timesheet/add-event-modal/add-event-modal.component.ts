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


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddEventModalComponent>,
    private formBuilder: FormBuilder) { }



  ngOnInit() {
    console.log(this.data);
    if(this.data.isEdit){
      console.log(this.data.toEdit);
      const tmp = this.data.toEdit;
      this.selectedContractCod = tmp.title;
      this.profileForm = this.formBuilder.group({
        numeroOre: [tmp.nOre, [Validators.required]],
        contractCode: [tmp.title, [Validators.required]],
        eventDate: [this.data.date, [Validators.required]]
      });
    } else {
      console.log("false");
      this.profileForm = this.formBuilder.group({
        numeroOre: [null, [Validators.required]],
        contractCode: [null, [Validators.required]],
        eventDate: [this.data.date, [Validators.required]]
      });
    }





  }

  get f() { return this.profileForm.controls; }

  submit() {




    console.log(this.profileForm.invalid);
    // if (this.profileForm.invalid) {

    //  return;
   // }
    this.dialogRef.close({ data: this.profileForm.value });
    /*this.submitted = true;

    console.log(this.profileForm.value.eventDate);
    if (this.profileForm.invalid) {

      return;
    }
    // console.warn(this.profileForm.value);
    this.activeModal.close(this.profileForm.value);*/
  }

  valueChanged(e) {
    this.value = e.target.value;
  }

  onChangeSelect($event){
    console.log($event);
    console.log(this.selectedContractCod);
  }
}
