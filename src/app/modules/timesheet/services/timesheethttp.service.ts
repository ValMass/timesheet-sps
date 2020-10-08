import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { environment } from '@environments/environment';
import { EMPTY, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { Timesheet } from '../model/timesheet';

@Injectable({
  providedIn: 'root'
})
export class TimesheethttpService implements Resolve<any> {

  constructor(
    private http: HttpClient,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return EMPTY;
  }

  getTimesheet(month, year, userid) {
    const url = environment.apiUrl + '/timesheets/getTimesheetByUserIdMonthYear.php';
    return this.http.post<any>(url, { month, year, userid }).pipe(catchError(error => {
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
  saveTimesheet(timesheet: Timesheet) {
    const url = environment.apiUrl + '/timesheets/createTimesheetV2.php';
    return this.http.post<Timesheet>( url, timesheet ).pipe(catchError(error => {
      return EMPTY;
    }), mergeMap(something => {
      if (something && (something["status"] === 'done')) {
        return of(something["data"]);
        console.log("observer pieno");
      } else {
        console.log("observer vuoto");
        return EMPTY;
      }
    })
    );
  }
}
