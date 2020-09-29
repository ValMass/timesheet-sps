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

  updateUser(user) {
    const url = environment.apiUrl + '/user/updateUserById.php';
    return this.http.post(url, user ).pipe(catchError(error => {
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

  createNewUser(userData) {
    let user = userData;
    console.log(user);
    if (user.role === true) {
      user.role = 1;
    } else {
      user.role = 2;
    }
    delete user.isadmin;
    const url = environment.apiUrl + '/user/createUser.php';
    return this.http.post(url, user ); /*.pipe(catchError(error => {
      return EMPTY;
    }), mergeMap(something => {
      if (something["data"]) {
        return of(something["data"]);
      } else {
        return EMPTY;
      }
    })
    );*/

  }
  deleteNewUser(userId) {
    const url = environment.apiUrl + 'user/deleteUserById.php';
    return this.http.post(url, { id: userId });


  }

  getListForUserList(month, year){
    const url = environment.apiUrl + 'user/listAllUserWithTimesheetForMonth.php';
    return this.http.post<any>(url, { month , year }).pipe(catchError(error => {
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
  getUserInfoById(id: Number) {
    const url = environment.apiUrl + 'user/getUserAndAnagById.php';
    return this.http.post<any>(url, {id: id});
  }

  exportUserInfoInXlmx(month: number, year: number) {
    const url = environment.apiUrl + 'user/listAllUserDataForMonthForExport.php';
    return this.http.post<any>(url, { month , year });
  }
}
