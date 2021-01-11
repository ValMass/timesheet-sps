import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { catchError, mergeMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimesheetaddtrasfService {

  constructor(private http: HttpClient) { }

  getPossibleDestination(customerId, userId) {
    const url = environment.apiUrl + 'timesheets/getPossibleDestinationV2.php';
    return this.http.post(url, { customerId, userId }).pipe(catchError(error => {
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

  addTrasferta(timesheetId, trasferta, data) {
    const url = environment.apiUrl + 'timesheets/addTrasfertaV2.php';
    return this.http.post(url, { timesheetId, trasferta, data }).pipe(catchError(error => {
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
