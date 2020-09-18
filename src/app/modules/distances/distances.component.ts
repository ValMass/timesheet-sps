import { Component, OnInit } from '@angular/core';
import { CustomerOfficeMatrix } from '@app/models/customerOfficeMatrix';
import { Office } from '@app/models/office';
import { DistancesService } from './services/distances.service';

@Component({
  selector: 'app-distances',
  templateUrl: './distances.component.html',
  styleUrls: ['./distances.component.css']
})
export class DistancesComponent implements OnInit {
  listAllOffice: Office[];
  officeSelected: Office;
  listAllCustomerOffice: CustomerOfficeMatrix[];

  constructor(private distancesService: DistancesService) { }

  ngOnInit() {
    this.distancesService.getAllOffices()
      .subscribe(res => {
        this.listAllOffice = res['data'];
    });
  }

  officeDistance(office: Office) {
    this.officeSelected = office;

    this.distancesService.getListMatrixPointsByOfficeID(office.id)
      .subscribe(res => {
        console.log(res);
        this.listAllCustomerOffice = res['data'];
    });
  }

  addDistanceFromOffice(distance, customerOffice) {
    // TODO: Aggiungere la distanza inserita
    console.log('CustomerOffice', customerOffice);
    console.log('Office', this.officeSelected);
    console.log('Distanza', distance);
  }
}