import { Component, OnInit, Input } from '@angular/core';
import { StatsUserService } from '../services/stats-user.service';


@Component({
  selector: 'app-worked-hour',
  templateUrl: './worked-hour.component.html',
  styleUrls: ['./worked-hour.component.css']
})
export class WorkedHourComponent implements OnInit {
  @Input() userId;
  @Input() month;
  @Input() year;
  @Input() workedThisMonth;
  @Input() dayWorkedThisMonth;
  @Input() daySmartWorkedThisMonth;
  @Input() deseaseThisMonth;
  @Input() permessiThisMonth;

  monthLabel = "";
  monthsName = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
   'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];

  constructor(private statsUserService: StatsUserService) { }

  ngOnInit(): void {
    this.monthLabel = this.monthsName[this.month];


    //this.statsUserService.loadAllEventForThisYear(this.userId, this.year).subscribe();
  }

}


