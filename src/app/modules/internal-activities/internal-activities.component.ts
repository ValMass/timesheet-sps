import { Component, OnInit } from '@angular/core';
import { InternalActivities } from './model/internal-activities';

@Component({
  selector: 'app-internal-activities',
  templateUrl: './internal-activities.component.html',
  styleUrls: ['./internal-activities.component.css']
})
export class InternalActivitiesComponent implements OnInit {
  InternalActivitiesList :InternalActivities[];
  constructor() { }

  ngOnInit(): void {
  }

}
