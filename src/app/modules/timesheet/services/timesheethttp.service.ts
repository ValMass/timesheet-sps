import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { environment } from '@environments/environment';
import { EMPTY, of, throwError } from 'rxjs';
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
  saveTimesheet(timesheet: Timesheet, loggeduserid) {
    const url = environment.apiUrl + '/timesheets/createTimesheetV2.php';
    return this.http.post<any>( url, { timesheet, loggeduserid}).pipe(catchError(error => {
      throw(error);
      return EMPTY;
    }), mergeMap(something => {
      if (something) {
        return of(something);
        //console.log("observer pieno");
      } else {
        //console.log("observer vuoto");
        return EMPTY;
      }
    })
    );
  }

  acceptAsUser(month, year, userid){
    const url = environment.apiUrl + 'timesheets/acceptTimesheetAsUser.php';
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

  acceptAsAdmin(month, year, userid){
    const url = environment.apiUrl + 'timesheets/acceptTimesheetAsAdmin.php';
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

  acceptAsFinally(month, year, userid, loggeduserid){
    const url = environment.apiUrl + 'timesheets/acceptTimesheetAsFinally.php';
    return this.http.post<any>(url, { month, year, userid, loggeduserid }).pipe(catchError(error => {
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



  resetState(month, year, userid, loggeduserid){
    const url = environment.apiUrl + 'timesheets/resetTimesheetState.php';
    return this.http.post<any>(url, { month, year, userid, loggeduserid }).pipe(catchError(error => {
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

  calcTrasferte(timesheetId, aciValue, diaria){

    const url = environment.apiUrl + 'timesheets/calcolaTrasferte.php';
    return this.http.post<any>(url, {timesheetId, aciValue, diaria });
  }

  getUserData( id ){
    const url = environment.apiUrl + 'user/getAllUserInfoByUserId.php';
    return this.http.post<any>(url, { id }).pipe(catchError(error => {
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

  saveDiariaAndAciValue(diaria, acivalue, currenttimesheeuserid ){
    const url = environment.apiUrl + 'economicData/updateDiariaAndAcivalue.php';
    return this.http.post<any>(url, { diaria, acivalue, currenttimesheeuserid }).pipe(catchError(error => {
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
  getUserOffice( id ){
    const url = environment.apiUrl + 'offices/getOfficesById.php';
    return this.http.post<any>(url, { id }).pipe(catchError(error => {
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

  getPossibleDestination( timesheetId ){
    const url = environment.apiUrl + 'timesheets/getPossibleDestination.php';
    return this.http.post<any>(url, { timesheetId }).pipe(catchError(error => {
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

  addTrasferta( timesheetId, aciValue, diaria, trasferteList ){
    const url = environment.apiUrl + 'timesheets/addTrasferta.php';
    return this.http.post<any>(url, { timesheetId, aciValue, diaria, trasferteList  }).pipe(catchError(error => {
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

  getInternalActivities(userid){
    const url = environment.apiUrl + 'internalActivities/listInternalActivitiesByUserId.php';
    return this.http.post<any>(url, { userid });
  }
}
