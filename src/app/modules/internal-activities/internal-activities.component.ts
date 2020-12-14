import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { InternalActivity } from './model/internal-activities';
import { InternalActivitiesService } from './services/internal-activities.service';

@Component({
  selector: 'app-internal-activities',
  templateUrl: './internal-activities.component.html',
  styleUrls: ['./internal-activities.component.css']
})
export class InternalActivitiesComponent implements OnInit {

  internalActivitiesList: InternalActivity[];
  selected: InternalActivity = undefined;
  InternalActivities: InternalActivity[];
  InternalActivityToDelete: InternalActivity
  showModal = false;
  message: string = '';
  addMode: boolean = false;
  //showbutton
  showButton: boolean = true;

  constructor(
    private InternalActivityService: InternalActivitiesService
  ) { }

  ngOnInit(): void {
    this.addActivity();
    this.getActivities();
  }


  //flag showbutton
  changeShowButton(flag) {
    this.showButton = flag;
  }

  enableAddMode() {
    this.selected = <any>{};
  }

  clear() {
    this.selected = null;
  }

  select(internalActivities: InternalActivity) {
    this.selected = internalActivities;
  }

  //FIXME
  getActivities() {
    this.InternalActivityService.getInternalActivitiesList("1").subscribe(
      res => console.log("GET", res));
  }

  askToDelete(InternalActivity: InternalActivity) {
    this.InternalActivityToDelete = InternalActivity;
    this.showModal = true;
    if (this.InternalActivityToDelete.id) {
      this.message = `Would you like to delete customer with id:${this.InternalActivityToDelete.id}?`;
    }
  }

  closeModal() {
    this.showModal = false;
  }

  //TODO
  deleteActivity() {

  }
  
  //FIXME
  addActivity() {
    let data1 = new Date();
    let data2 = new Date();
    this.InternalActivityService.createInternalActivities("1", "ciccio", data1, data2, 1).subscribe(
      res => {
        console.log("create", res);
      }
    );
  }

  //TODO
  updateActivity(){
    
  }


}
