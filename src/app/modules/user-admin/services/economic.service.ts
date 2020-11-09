import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { EMPTY, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EconomicService {

  constructor(private http: HttpClient) { }
  getEconomic(id) {
    const url = environment.apiUrl + 'economicData/getEconomicDataId.php';
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
  
  updateEconomicData( economic ) {

    const url = environment.apiUrl + 'economicData/updateEconomicData.php';
    return this.http.post<any>(url, economic).pipe(catchError(error => {
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
