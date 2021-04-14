import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { LoaderService } from '@app/component/loader/loader.service';
import { CustomerOfficeMatrix } from '@app/models/customerOfficeMatrix';
import { Office } from '@app/models/office';
import { Customer } from '../customers/customer';
import { DistancesService } from './services/distances.service';

@Component({
  selector: 'app-distances',
  templateUrl: './distances.component.html',
  styleUrls: ['./distances.component.css'],
})
export class DistancesComponent implements OnInit {
  listAllOffice: Office[];
  listAllCustomer: Customer[];
  officeSelected: Office;
  listAllCustomerOffice: Array<any>;
  isSuperAdmin : boolean = false;
  isDistanceDiff : boolean = false;

  constructor(
    private distancesService: DistancesService,
    private readonly loaderService: LoaderService,
    private authenticationService: AuthenticationService,
  ) {}

  ngOnInit() {
    this.isSuperAdmin = this.getRoleFromLocalStorage() === "0"  ? true : false

    this.distancesService.getAllOffices().subscribe((res) => {
      this.listAllOffice = res['data'];
    });

    this.distancesService.getAllCustomer().subscribe((res) => {
      this.listAllCustomer = res['data'];
    });
  }

  officeDistance(office: Office) {
    this.isDistanceDiff = false;
    this.loaderService.show();
    this.officeSelected = office;
    this.distancesService.getListMatrixPointsByOfficeID(office.id).subscribe(
      (res) => {
        this.listAllCustomerOffice = res['data'].map((customerOffice) => {
          this.distancesService
            .getDistanceFromOffice(this.officeSelected, customerOffice.cus)
            .then((distanceOffice) => {
              const distance = Math.floor(
                distanceOffice['features'][0].properties.summary.distance /
                  1000,
              );
              /*if (Number(customerOffice.mat.distance) === 584) {
                customerOffice.mat.distance = customerOffice.mat.distance + 1
              }*/
              if (Number(customerOffice.mat.distance) !== distance) {
                customerOffice.mat.distance = distance;
                this.isDistanceDiff = true;
                customerOffice.mat['isDisabled'] = false;
              } else {
                customerOffice.mat['isDisabled'] = true;
              }
            });
          return customerOffice;
        });
      },
      (err) => {
        this.loaderService.hide();
        console.log(err);
      },
      () => {
        setTimeout(() => {
          this.loaderService.hide();
        }, 1500);
      },
    );
  }

  updateDistanceFromOffice(distance, customerOffice: CustomerOfficeMatrix) {
    this.distancesService
      .updateMatrixPointsToCustomerId(
        distance,
        this.officeSelected.id,
        customerOffice.cus.id,
      )
      .subscribe((res) => {
        console.log(res);
        customerOffice.mat['isDisabled'] = true;
      });
  }

  getRoleFromLocalStorage() {
    const user: any = this.authenticationService.currentUserValue;
    return user.isadmin;
  }
}
