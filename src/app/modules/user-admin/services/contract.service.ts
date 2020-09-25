import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { catchError, mergeMap, map } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  constructor(private http: HttpClient) { }

  listAllContract(){
    const id = 1;
    const url = environment.apiUrl + 'contract/listAllContract.php';
    return this.http.post<any>(url, { id })
      .pipe(catchError(error => {
        return EMPTY;
      }), 
      mergeMap(something => {
        if (something) {
          return of(something);
        } else {
          return EMPTY;
        }
      }));
  }

  getContract(id) {
    const url = environment.apiUrl + 'contract/getContractById.php';
    return this.http.post(url, { id })
      .pipe(catchError(error => {
        return EMPTY;
      }), 
      mergeMap(something => {
        if (something) {
          return of(something);
        } else {
          return EMPTY;
        }
      }));
  }
}
