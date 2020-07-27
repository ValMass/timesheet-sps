import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, mergeMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsumerOfficesResolverService implements Resolve<any> {

  constructor(private http: HttpClient) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.paramMap.get('id');
    console.log('ConsumerOfficesResolverService: ' + id);
    const url = environment.apiUrl + '/customerOffices/listAllCustomerOfficesByCustomerId.php';
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
