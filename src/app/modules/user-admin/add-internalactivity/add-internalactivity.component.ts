import { DatePipe } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-add-internalactivity',
  templateUrl: './add-internalactivity.component.html',
  styleUrls: ['./add-internalactivity.component.css'],
  providers: [DatePipe]
})
export class AddInternalactivityComponent implements OnInit {
  public internalActivitiesList : any[] = [];
  public internalForm: FormGroup;
  public submitted = false;
  public internalAct: any = null;
  public sede : string;
  public startdate : string;
  public enddate : string;
  

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef <AddInternalactivityComponent>,
    private formBuilder: FormBuilder,
    public datepipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.internalForm = this.formBuilder.group({
      ruolo:       ['',[Validators.required]],
      internalAct: ['',[Validators.required]]
    })
    this.internalActivitiesList = this.data.internalActivitiesList;
    this.sede = "Nessuna attività interna selezionata";
    this.startdate = "Nessuna attività interna selezionata";
    this.enddate = "Nessuna attività interna selezionata";
  }

  submit(){
    this.submitted = true;
    if(!this.internalForm.invalid){
      this.dialogRef.close({ data: this.internalForm.value });
    }
  }

  close() {
    this.dialogRef.close();
  }

  setSedeAndTime(evento){
    if(evento){
      this.sede = evento.offi.address;
      this.startdate = this.datepipe.transform(evento.inat.startdate , 'dd-MM-yyyy');
      this.enddate = this.datepipe.transform(evento.inat.enddate , 'dd-MM-yyyy');
    }else{
      this.sede = "Nessuna attività interna selezionata";
      this.startdate = "Nessuna attività interna selezionata";
      this.enddate = "Nessuna attività interna selezionata";
    }
  }

}
