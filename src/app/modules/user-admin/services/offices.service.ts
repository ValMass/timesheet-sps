import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { catchError, mergeMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfficesService {

  constructor(private http: HttpClient) { }

  listAllOffices() {
    const id = 1;
    const url = environment.apiUrl + 'offices/listAllOffices.php';
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

  //TODO dopo fai il file apposta
  getListAllRegnumSps(){
    const url = environment.apiUrl + 'user/getPossibleRegNumImps.php';
    return this.http.post<any>(url, {}).pipe(catchError(error => {
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
