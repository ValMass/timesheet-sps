import { DatePipe } from '@angular/common';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-admin-calendar',
  templateUrl: './user-admin-calendar.component.html',
  styleUrls: ['./user-admin-calendar.component.css'],
  providers: [DatePipe]
})
export class UserAdminCalendarComponent implements OnInit {
  
  @Output() dateToLoad = new EventEmitter<any>();

  data : any = {};
  monthSelected : string;
  yearSelected : string;

  constructor(public datepipe: DatePipe) { }

  ngOnInit(): void {
  }

  changeData(date){
    this.data.year = this.datepipe.transform(date.value, 'yyyy');
    this.data.month = this.datepipe.transform(date.value, 'MM');
  }

  loadDate(){
    this.dateToLoad.emit(this.data);
  }

}
