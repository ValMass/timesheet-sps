import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  createNewCustomer(customer) {
    /*const realuser = customer.data;
    const username = realuser.username;
    const password = realuser.password;
    const email = realuser.email;
    const userscreationdate = new Date();*/
    const url = environment.apiUrl + '/user/createUser.php';
    return this.http.post(url, { /*username, password, email, userscreationdate*/  });

  }

  deleteCustomer(customer) {
    const url = environment.apiUrl + '/user/createUser.php';
    return this.http.post(url, { /*username, password, email, userscreationdate*/  });
  }
}
