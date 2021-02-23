import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { catchError, mergeMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAnagService {

  constructor(private http: HttpClient) { }

  getAnagraphic(id) {
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

  getWorkOffice(id) {
    const url = environment.apiUrl + 'offices/getOfficesById.php';
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

  updateAnagraphicForUser(anagraphic) {
    const url = environment.apiUrl + 'anagraphicData/updateAnagraphicDataById.php';
    return this.http.post(url, anagraphic).pipe(catchError(error => {
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

  changePassword(newPassword , oldPassword) {
    const url = environment.apiUrl + 'user/ordinaryUserChangePassword.php';
    return this.http.post<any>(url, { newPassword , oldPassword }).pipe(catchError(error => {
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


/*

import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, mergeMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnagraphicService {

  constructor(private http: HttpClient) { }

  getAnagraphic(id) {
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

  addAnagraphicForUser(anagraphic) {
    const url = environment.apiUrl + 'anagraphicData/createAnagraphicData.php';
    return this.http.post(url, anagraphic).pipe(catchError(error => {
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

  updateAnagraphicForUser(anagraphic) {
    const url = environment.apiUrl + 'anagraphicData/updateAnagraphicDataById.php';
    return this.http.post(url, anagraphic).pipe(catchError(error => {
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

  deleteAnagraphic(anagid) {
    const url = environment.apiUrl + 'anagraphicData/deleteAnagraphicDataById.php';
    return this.http.post(url, { id: anagid }).pipe(catchError(error => {
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
*/

