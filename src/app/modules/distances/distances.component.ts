import { Component, OnInit } from '@angular/core';
import { CustomerOfficeMatrix } from '@app/models/customerOfficeMatrix';
import { Office } from '@app/models/office';
import { Customer } from '../customers/customer';
import { DistancesService } from './services/distances.service';

@Component({
  selector: 'app-distances',
  templateUrl: './distances.component.html',
  styleUrls: ['./distances.component.css']
})
export class DistancesComponent implements OnInit {
  listAllOffice: Office[];
  listAllCustomer: Customer[];
  officeSelected: Office;
  listAllCustomerOffice: Array<any>;

  constructor(private distancesService: DistancesService) { }

  ngOnInit() {
    this.distancesService.getAllOffices()
      .subscribe(res => {
        this.listAllOffice = res['data'];
    });

    this.distancesService.getAllCustomer()
      .subscribe(res => {
        this.listAllCustomer = res['data'];
      });
  }

  officeDistance(office: Office) {
    this.officeSelected = office;
    this.distancesService.getListMatrixPointsByOfficeID(office.id)
      .subscribe(res => {
        this.listAllCustomerOffice = res['data'].map(office => {
          this.distancesService.getDistanceFromOffice(this.officeSelected, office.cus)
            .then(res => {
              const distance = Math.floor(res['features'][0].properties.summary.distance / 1000);
              if (Number(office.mat.distance) !== distance) {
                office.mat.distance = distance;
                office.mat['isDisabled'] = false;
              } else {
                office.mat['isDisabled'] = true;
              }
            });
          return this.listAllCustomer.map(el => {
            if (el.id === office.cus.customerid) return { ...el, ...office };
          });
        });
    });
  }

  updateDistanceFromOffice(distance, customerOffice: CustomerOfficeMatrix) {
    this.distancesService.updateMatrixPointsToCustomerId(distance, this.officeSelected.id, customerOffice.cus.id)
      .subscribe(res => console.log(res));
  }
}