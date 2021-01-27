import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { catchError, mergeMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class TimesheetaddeventService {

  constructor(private http : HttpClient  ) { }

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

  getAllOffices(){
    const url = environment.apiUrl + 'offices/listAllOffices.php';
    return this.http.post(url,  {}).pipe(catchError(error => {
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

}
