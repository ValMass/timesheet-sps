import { FormControl } from '@angular/forms';
import { Office } from './../../offices/models/office';
import { InternalActivitiesService } from './../services/internal-activities.service';
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
  sedi: Office[];
  startdate : any;
  enddate : any;
  listUser : any;

  constructor(private internalActivityService: InternalActivitiesService) { 
    
  }

  ngOnInit(): void {
    this.getSedi();
    this.setDates();
    
    if(this.internalActivity.id > 0){
      this.getUserAssignedActivity(this.internalActivity.id);
    }
  }

  ngOnChanges() {
    if (this.internalActivity && this.internalActivity.id) {
      this.editingInternalActivity = { ...this.internalActivity };
      this.addMode = false;
    } else {
      this.editingInternalActivity = { id: undefined, name: '', startdate: '', enddate: '' };
      this.addMode = true;
    }
  }

  onSubmit() {
    this.submitted = true;
    this.save.emit(this.editingInternalActivity);
    this.clear();
  };

  clear() {
    this.showButton.emit(true);
    this.unselect.emit();
  }

  getSedi(){
    this.internalActivityService.getAllOffices().subscribe(data => {
       this.sedi = data['data'];
    });
  }

  setDatestart(data){
    this.editingInternalActivity.startdate = data.value;
  }

  setDateend(data){
    this.editingInternalActivity.enddate = data.value;
  }

  setDates(){
    if(this.internalActivity != undefined){
      this.startdate = new FormControl(this.editingInternalActivity.startdate);
      this.enddate = new FormControl(this.editingInternalActivity.enddate);  
    }else{
      this.startdate = new FormControl(new Date());
      this.enddate = new FormControl(new Date());
      this.editingInternalActivity.startdate = this.startdate.value;
      this.editingInternalActivity.enddate = this.enddate.value;
    }
  }

  getUserAssignedActivity(id){
    this.internalActivityService.listAllUserByInternalActivity(id).subscribe( res => {
      this.listUser  = res['data'];
    })
  }
}
