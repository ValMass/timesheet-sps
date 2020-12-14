import { Component, OnInit } from '@angular/core';
import { InternalActivities } from './model/internal-activities';
import { InternalActivitiesService } from './services/internal-activities.service';

@Component({
  selector: 'app-internal-activities',
  templateUrl: './internal-activities.component.html',
  styleUrls: ['./internal-activities.component.css']
})
export class InternalActivitiesComponent implements OnInit {
  InternalActivitiesList :InternalActivities[];
  constructor(
    private internalActivities: InternalActivitiesService
    ) { }

  ngOnInit(): void {
    let data1 = new Date();
    let data2 = new Date();
    this.internalActivities.createInternalActivities("1", "ciccio", data1, data2, 1).subscribe(
      res => {
        console.log(res);
      }
  );
    this.internalActivities.getInternalActivitiesList("1").subscribe(
        res => {
          console.log(res);
        }
    );
  }

}
