import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { environment } from '@environments/environment';
import { catchError, mergeMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TimesheetResolverService implements Resolve<any> {

  constructor(private http: HttpClient) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log(route.paramMap.get('id'));
    /*const url = environment.apiUrl + '/timesheets/getTimesheetByUserIdMonthYear.php';
    return this.http.post(url , { url }).pipe(catchError(error   => {
      return EMPTY;
    }), mergeMap(something => {
         if (something) {
            return of(something);
         } else {
            return EMPTY;
         }
       })
     );*/
  }

  getTimesheet( month, year, userid ){
    const url = environment.apiUrl + '/timesheets/getTimesheetByUserIdMonthYear.php';
    return this.http.post(url , { month, year, userid }).pipe(catchError(error   => {
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
    const url = environment.apiUrl + 'timesheets/acceptTimesheetByAdministrator.php';
    console.log(url);
    return this.http.post(url , { month , year, userid });
  }

  resetState(month , year, userid){
    const url = environment.apiUrl + 'timesheets/resetTimesheetState.php';
    console.log(url);
    return this.http.post(url , { month , year, userid });
  }

  getAllActivities(userid) {
    const url = environment.apiUrl + 'activities/getActivityAndCustomerByUserid.php';
    return this.http.post<any>( url, { userid }  ).pipe(catchError(error => {
      return EMPTY;
    }), mergeMap(something => {
      if (something) {
        return of(something);
      } else {
        console.log("observer vuoto");
        return EMPTY;
      }
    })
    );
  }
}
