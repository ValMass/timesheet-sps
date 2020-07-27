import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { catchError, mergeMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContractResolverService implements Resolve<any> {

  constructor(private http: HttpClient) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const url = environment.apiUrl + '/contract/listAllContract.php';
    return this.http.post(url , { url }).pipe(catchError(error   => {
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
