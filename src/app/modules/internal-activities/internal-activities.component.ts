import { ToastrService } from 'ngx-toastr';
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
  selected: any = undefined;
  internalActivities: InternalActivity[];
  internalActivityToDelete: any;
  showModal = false;
  message: string = '';
  addMode: boolean = false;
  //showbutton
  showButton: boolean = true;

  constructor(
    private internalActivityService: InternalActivitiesService,
    private toastrService: ToastrService,
  ) { }

  ngOnInit(): void {
    //this.addActivity();
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

  getActivities() {
    this.internalActivityService.getInternalActivitiesList("1").subscribe(
      res => { 
        this.internalActivities = res["data"];
      });
  }

  askToDelete(InternalActivity: InternalActivity) {
    this.internalActivityToDelete = InternalActivity;
    this.showModal = true;
    if (this.internalActivityToDelete.inat.id) {
      this.message = `Would you like to delete customer with id:${this.internalActivityToDelete.inat.id}?`;
    }
  }

  closeModal() {
    this.showModal = false;
  }

  deleteActivity() {
    this.closeModal();
    if (this.internalActivityToDelete) {
      this.internalActivityService
        .deleteInternalActivitiesList(this.internalActivityToDelete.inat.id)
        .subscribe((data) => {
          this.internalActivities = this.internalActivities.filter(office => office !== this.internalActivityToDelete);
          (this.internalActivityToDelete = null);
          this.toastrService.warning('utente cancellato');
        }, err => {
          this.toastrService.error('operazione non riuscita');
        });
    }
    this.clear();
  }

  save(internalActivity: InternalActivity) {
    if (internalActivity && internalActivity.id) {
      this.updateActivity(internalActivity);
    } else {
      this.addActivity(internalActivity);
    }
  }
  
  addActivity(internalActivity) {
    this.internalActivityService.createInternalActivities(
      internalActivity.officesid, internalActivity.name, internalActivity.startdate,internalActivity.enddate, 1).subscribe(
      res => {
        this.internalActivities.push(res["data"]);
      }
    );
  }

  updateActivity(internalActivity){
    this.internalActivityService.updateInternalActivities(
      internalActivity.id ,  internalActivity.officesid, internalActivity.name, internalActivity.startdate,internalActivity.enddate, 1)
      .subscribe(
        res => {
          let toUpd : any = res["data"];
          const index = this.internalActivities.findIndex(i =>{
             if(i["inat"].id === toUpd["inat"].id){
               return(toUpd["inat"].id);
             }
          })
          this.internalActivities[index]= toUpd;
        }
      );
  }


}
