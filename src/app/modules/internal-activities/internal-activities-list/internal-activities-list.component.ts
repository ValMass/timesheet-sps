import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InternalActivity } from '../model/internal-activities';

@Component({
  selector: 'app-internal-activities-list',
  templateUrl: './internal-activities-list.component.html',
  styleUrls: ['./internal-activities-list.component.css']
})
export class InternalActivitiesListComponent implements OnInit {
  @Input() InternalActivities: InternalActivity[];
  @Output() deleted = new EventEmitter<InternalActivity>();
  @Output() selected = new EventEmitter<InternalActivity>();
  @Output() associate = new EventEmitter<InternalActivity>();
  
  //showbutton
  @Output() showButton = new EventEmitter<Boolean>();
  
  constructor() { }

  ngOnInit(): void {
  }

  selectInternalActivity(InternalActivity: InternalActivity) {
    this.showButton.emit(false);
    this.selected.emit(InternalActivity);
  }

  deleteInternalActivity(InternalActivity: InternalActivity) {
    //console.log('emit');

    this.deleted.emit(InternalActivity);
  }

  chooseInternalActivity(InternalActivity: InternalActivity) {
    //here you should pass office down
    //console.log('associate InternalActivity');
    this.associate.emit(InternalActivity);
  }

  trackById(index: number, InternalActivity: InternalActivity): number {
    return InternalActivity.id;
  }
}
