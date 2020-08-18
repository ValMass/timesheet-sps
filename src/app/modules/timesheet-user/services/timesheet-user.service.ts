import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { catchError, mergeMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { Timesheetu } from '../models/timesheet';

@Injectable({
  providedIn: 'root'
})
export class TimesheetUserService implements Resolve<any> {

  constructor(private http: HttpClient) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    throw new Error("Method not implemented.");
  }

  getTimesheet(month, year, userid) {
    const url = environment.apiUrl + '/timesheets/getTimesheetByUserIdMonthYear.php';
    return this.http.post<Timesheetu>(url, { month, year, userid }).pipe(catchError(error => {
      return EMPTY;
    }), mergeMap(something => {
      if (something) {
        console.log("ok");
        return of(something["data"]);
      } else {

        console.log("observer vuoto");
        return EMPTY;
      }
    })
    );

  }

  saveTimesheet(Timesheet: Timesheetu) {
    const url = environment.apiUrl + '/timesheets/createTimesheetV2.php';
    return this.http.post<Timesheetu>( url, Timesheet ).pipe(catchError(error => {
      return EMPTY;
    }), mergeMap(something => {
      if (something && (something["status"] === 'done')) {
        return of(something["data"]);
      } else {
        console.log("observer vuoto");
        return EMPTY;
      }
    })
    );
  }
}
