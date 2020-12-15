import { InternalActivity } from './../model/internal-activities';
import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-internal-activities-detail',
  templateUrl: './internal-activities-detail.component.html',
  styleUrls: ['./internal-activities-detail.component.css']
})
export class InternalActivitiesDetailComponent implements OnInit, OnChanges {

  @Input() internalActivity : InternalActivity;
  @Output() unselect = new EventEmitter<string>();
  @Output() save = new EventEmitter<InternalActivity>();

  //flag showButton
  @Output() showButton = new EventEmitter<Boolean>();

  submitted:boolean;
  addMode = false;
  editingInternalActivity: InternalActivity;

  constructor() { 
    
  }

  ngOnInit(): void {
    console.log(this.internalActivity)
  }

  ngOnChanges() {
    if (this.internalActivity && this.internalActivity.id) {
      this.editingInternalActivity = { ...this.internalActivity };
      this.addMode = false;
    } else {
      this.editingInternalActivity = { id: undefined, nomeattivita: '', startDate: '', endDate: '' };
      this.addMode = true;
    }
  }

  onSubmit() {
    console.log('ok');
    this.submitted = true;
    console.log(this.editingInternalActivity);
    this.save.emit(this.editingInternalActivity);
    this.clear();
  };

  clear() {
    this.showButton.emit(true);
    this.unselect.emit();
  }

}
