import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable, EMPTY, of } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerOfficeService {

  constructor(private http: HttpClient) { }

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
