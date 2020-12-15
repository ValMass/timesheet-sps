import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InternalActivity } from '../model/internal-activities';

@Component({
  selector: 'app-internal-activities-list',
  templateUrl: './internal-activities-list.component.html',
  styleUrls: ['./internal-activities-list.component.css']
})
export class InternalActivitiesListComponent implements OnInit {
  @Input() internalActivities: InternalActivity[];
  @Output() deleted = new EventEmitter<InternalActivity>();
  @Output() selected = new EventEmitter<InternalActivity>();
  @Output() associate = new EventEmitter<InternalActivity>();
  
  //showbutton
  @Output() showButton = new EventEmitter<Boolean>();
  
  constructor() { }

  ngOnInit(): void {
  }

  selectInternalActivity(internalActivity: InternalActivity) {
    this.showButton.emit(false);
    this.selected.emit(internalActivity);
  }

  deleteInternalActivity(internalActivity: InternalActivity) {
    //console.log('emit');

    this.deleted.emit(internalActivity);
  }

  chooseInternalActivity(internalActivity: InternalActivity) {
    //here you should pass office down
    //console.log('associate InternalActivity');
    this.associate.emit(internalActivity);
  }

  trackById(index: number, internalActivity: InternalActivity): number {
    return internalActivity.id;
  }
  
}
