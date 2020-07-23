import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable, EMPTY, of } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OfficeService {

  constructor(private http: HttpClient) { }

  save(office) {
    const realuser = office.data;
    const address = realuser.address; 
    const city = realuser.city;
    const cap = realuser.cap;
    const userscreationdate = new Date();
    const url = environment.apiUrl + '/offices/createOffices.php';
    return this.http.post(url, { address, city, cap, userscreationdate  });
  }

  delete(office) {
    const id = office.id;
    const url = environment.apiUrl + '/offices/deleteOfficesById.php';
    console.log(url);
    return this.http.post(url, { id });
  }
}
