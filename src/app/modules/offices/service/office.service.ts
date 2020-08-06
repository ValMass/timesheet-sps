import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { Office } from '../models/office';

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

  getAllOffices():Observable<Office[]>{
    const url = environment.apiUrl + '/offices/listAllOffices.php';
    return this.http.get<Office[]>(url);

  }

  deleteOffice(office) {
    const id = office.id;
    const url = environment.apiUrl + '/offices/deleteOfficesById.php';
    console.log(url);
    return this.http.post(url,  {id:id} );
  }

  createNewOffice(office){
    const url = environment.apiUrl + '/offices/createCustomerOffices.php';
    console.log(url);
    return this.http.post(url,  office );
  }

  updateOffice(office){
    const url = environment.apiUrl + '/offices/updateCustomerOfficesById.php';
    console.log(url);
    return this.http.post(url,  office );
  }

}
