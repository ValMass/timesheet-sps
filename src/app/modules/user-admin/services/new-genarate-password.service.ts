import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { EMPTY, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NewGenaratePasswordService {

  constructor(private http : HttpClient) { }

  changePassword(userId , newPassword) {
    const url = environment.apiUrl + 'user/changePassword.php';
    return this.http.post<any>(url, { userId , newPassword }).pipe(catchError(error => {
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
