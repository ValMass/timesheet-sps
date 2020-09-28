import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { catchError, mergeMap } from 'rxjs/operators';
import { EMPTY, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private http: HttpClient) { }

  listActivities(userid) {
    const url = environment.apiUrl + 'activities/getActivityAndCustomerByUserid.php';
    return this.http.post<any>(url, { userid }).pipe(catchError(error => {
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

  createActivity(activityname, user, customer) {
    const url = environment.apiUrl + 'activities/createActivities.php';
    const topass = {
      name: activityname,
      customerid: customer,
      userid: user
    };
    console.log(topass);
    return this.http.post<any>(url,  topass ).pipe(catchError(error => {
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

  deleteActivityById(activityId): Observable<any> {
    const url = environment.apiUrl + 'activities/deleteActivitiesById.php';
    return this.http.post(url, {id: activityId});
  }
}
