import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserAdmin } from '../models/User-admin';
import { environment } from '@environments/environment';
import { catchError, mergeMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserAdminService implements Resolve<UserAdmin[]> {

  constructor(private http: HttpClient) { }

  resolve(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): UserAdmin[] | import('rxjs').Observable<UserAdmin[]> | Promise<UserAdmin[]> {
    const url = environment.apiUrl + '/user/listAllUsers.php';
    return this.http.post<any>(url, { url }).pipe(catchError(error => {
      return EMPTY;
    }), mergeMap(something => {
      if (something) {
        return of(something.data);
      } else {
        return EMPTY;
      }
    })
    );
  }

  updateCustomer(user){

  }

  createNewCustomer(user){
    
  }

}
