import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { catchError, mergeMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatsUserService {

  constructor(private http: HttpClient) { }

  loadAllEventForThisYear(userid, year) {
    const url = environment.apiUrl + 'timesheets/getAllEventOfThisYear.php';
    return this.http.post(url, { userid , year }).pipe(catchError(error => {
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

  getAnagraphicById(id) {
    const url = environment.apiUrl + 'anagraphicData/getAnagraphicDataById.php';
    return this.http.post(url, { id }).pipe(catchError(error => {
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
