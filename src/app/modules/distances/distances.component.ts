import { Component, OnInit } from '@angular/core';
import { CustomerOffice } from '@app/models/customeroffice';
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
  listAllCustomerForOffice: CustomerOffice[];

  constructor(private distancesService: DistancesService) { }

  ngOnInit() {
    this.distancesService.getAllOffices()
      .subscribe(res => {
        this.listAllOffice = res['data'];
    });

    this.distancesService.getAllCustomerOffice()
      .subscribe(res => {
        this.listAllCustomerForOffice = res;
    });
  }

  officeDistance(office: Office) {
    this.officeSelected = office;
    this.listAllCustomerForOffice.forEach((customerOffice, index) => {
      this.distancesService.getDistanceFromOffice(office.address, customerOffice.address).then(res => {
        this.listAllCustomerForOffice[index].distanza = res;
      });
    });
  }
}