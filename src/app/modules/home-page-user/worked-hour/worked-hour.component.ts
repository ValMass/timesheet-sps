import { Component, OnInit, Input } from '@angular/core';
import { StatsUserService } from '../services/stats-user.service';


@Component({
  selector: 'app-worked-hour',
  templateUrl: './worked-hour.component.html',
  styleUrls: ['./worked-hour.component.css']
})
export class WorkedHourComponent implements OnInit {
  @Input() userId;
  @Input() year;
  @Input() workedThisMonth;

  constructor(private statsUserService: StatsUserService) { }

  ngOnInit(): void {


    //this.statsUserService.loadAllEventForThisYear(this.userId, this.year).subscribe();
  }

}


