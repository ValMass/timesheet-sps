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

  getOfficesByCustomer(customerid): Observable<Office> {
    const url = environment.apiUrl + 'customerOffices/listAllCustomerOfficesByCustomerId.php';
    return this.http.post(url, { customerid }).pipe(catchError(error => {
      return EMPTY;
    }), mergeMap(something => {
      if (something) {
        return of(something['data'] as Office);
      } else {
        return EMPTY;
      }
    })
    );
  }

  save(customeroffice) {
    const realuser = customeroffice.data;
    const address = realuser.address;
    const city = realuser.city;
    const cap = realuser.cap;
    const userscreationdate = new Date();
    const url = environment.apiUrl + '/customeroffices/createCustomerOffices.php';
    return this.http.post(url, { address, city, cap, userscreationdate  });
  }

  delete(customeroffice) {
    const id = customeroffice.id;
    const url = environment.apiUrl + '/customeroffices/deleteCustomerOfficesById.php';
    console.log(url);
    return this.http.post(url, { id });
  }
}
