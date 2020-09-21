import { Office } from './../../../models/office';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { catchError, mergeMap } from 'rxjs/operators';
import { EMPTY, of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerOfficeService {

  constructor(private http: HttpClient) { }

  getOfficesByCustomer(customerid) {
    const url = environment.apiUrl + 'customerOffices/listAllCustomerOfficesByCustomerId.php';
    return this.http.post(url, { customerid }).pipe(catchError(error => {
      return EMPTY;
    }), mergeMap(something => {
      if (something) {
        return of(something);
      } else {
        return EMPTY;
      }
    })
    );
  }

  save(customeroffice) {
    const url = environment.apiUrl + '/customerOffices/createCustomerOffices.php';
    return this.http.post(url, { address: customeroffice['address'], city: customeroffice['citta'], cap: customeroffice['cap'], customerid: customeroffice['customerid'] });
  }

  update(customeroffice, id, customerid) {
    const url = environment.apiUrl + 'customerOffices/updateCustomerOfficesById.php';
    return this.http.post(url, { id: id, address: customeroffice['data'].address, city: customeroffice['data'].citta, cap: customeroffice['data'].cap, customerid: customerid });
  }

  delete(customeroffice) {
    const id = customeroffice.id;
    const url = environment.apiUrl + '/customerOffices/deleteCustomerOfficesById.php';
    return this.http.post(url, { id });
  }
}
