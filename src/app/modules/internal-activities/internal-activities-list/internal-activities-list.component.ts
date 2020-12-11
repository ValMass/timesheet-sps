import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InternalActivities } from '../model/internal-activities';

@Component({
  selector: 'app-internal-activities-list',
  templateUrl: './internal-activities-list.component.html',
  styleUrls: ['./internal-activities-list.component.css']
})
export class InternalActivitiesListComponent implements OnInit {
  @Input() offices: InternalActivities[];
  @Output() deleted = new EventEmitter<InternalActivities>();
  @Output() selected = new EventEmitter<InternalActivities>();
  @Output() associate = new EventEmitter<InternalActivities>();

  constructor() { }

  ngOnInit(): void {
  }

}
