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


