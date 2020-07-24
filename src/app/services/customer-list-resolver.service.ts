import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, mergeMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerListResolverService implements Resolve<any>{

  constructor(private http: HttpClient) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const url = environment.apiUrl + '/customer/listAllCustomer.php';
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
