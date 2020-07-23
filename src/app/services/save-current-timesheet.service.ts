import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router , Resolve , RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, EMPTY, of } from 'rxjs';

import { mergeMap, catchError } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { GenericResponse } from '@app/models/genericresponse';

@Injectable({
  providedIn: 'root'
})
export class SaveCurrentTimesheetService {

  constructor(private http: HttpClient) {

  }

  save(events , month, year, userid) {

    const url = environment.apiUrl + '/timesheets/createTimesheet.php';
    return this.http.post(url , { events , month , year, userid}).pipe(catchError(error   => {
      console.log(error);
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

  loadCurrentViewedEvent(month , year, userid) {
    const url = environment.apiUrl + '/timesheets/getTimesheetByUserIdMonthYear.php';
    return this.http.post(url , { month , year, userid });
  }

  freeze(month , year, userid) {
    const url = environment.apiUrl + '/timesheets/freezeTimesheet.php';
    console.log(url);
    return this.http.post(url , { month , year, userid });
  }
}
