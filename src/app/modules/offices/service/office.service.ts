import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OfficeService {

  constructor( private http: HttpClient, private router: Router, ) {

  }

  update( office ) {
    console.log(office);
    const id = office.id;
    const address = office.address;
    const city = office.city;
    const cap = office.cap;
    const url = environment.apiUrl + '/offices/updateOfficesById.php';
    return this.http.post(url, { id, address, city, cap  });
  }

  save() {

  }

  delete() {

  }
}
