import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as moment from 'moment';

@Component({
  selector: 'app-user-admin-calendar',
  templateUrl: './user-admin-calendar.component.html',
  styleUrls: ['./user-admin-calendar.component.css'],
  providers: [DatePipe]
})
export class UserAdminCalendarComponent implements OnInit {

  @Output() dateToLoad = new EventEmitter<any>();
  public pickerDate;
  @ViewChild('picker') datePicker: MatDatepicker<any>;

  data: any = {};
  newData : Date;

  constructor(public datepipe: DatePipe,   private toastrService: ToastrService,) { }

  ngOnInit(): void {
    const today = new Date();
    this.pickerDate = moment(today).format('MM-YYYY')
  }

  closeDatePicker(event) {
    this.changeData(event);
    this.pickerDate = moment(event).format('MM-YYYY');
    this.datePicker.close();
  }

  changeData(date) {
    this.newData = date
    this.data.year = this.datepipe.transform(date, 'yyyy');
    this.data.month = this.datepipe.transform(date, 'MM');
  }

  setlocal(){
    const today = new Date();
    this.data.year = this.datepipe.transform(today, 'yyyy');
    this.data.month = this.datepipe.transform(today, 'MM');
    this.pickerDate = moment(today).format('MM-YYYY')
    this.dateToLoad.emit(this.data);
    this.toastrService.success("Data inserita valida");

  }

  //se la data selezionata è post la data odierna la data non viene aggiornata 
  loadDate() {
    const today = new Date(); //data
    if( this.newData < today  ){
        this.dateToLoad.emit(this.data);
        this.toastrService.success("Data inserita valida");
    } else {
      this.toastrService.error("Data inserita non valida");
    }
  }
}
