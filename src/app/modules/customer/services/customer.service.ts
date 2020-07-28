import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { catchError, mergeMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService implements Resolve<any>  {

  constructor(private http: HttpClient, private route: ActivatedRoute,) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const url = environment.apiUrl + '/customer/listAllCustomer.php';
    const id = 12;
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

  createNewCustomer(customerData) {
    const customer = customerData.data;
    const name = customer.nome;
    const legaladdress = customer.legaladdress;
    const pivacodicefiscale = customer.piva;
    const rea = customer.rea;
    const postacertificata = customer.postacertificata;
    const referente = customer.referente;
    const url = environment.apiUrl + '/customer/createCustomer.php';
    return this.http.post(url, { name, legaladdress, pivacodicefiscale, rea, postacertificata, referente  });

  }

  deleteCustomer(customer) {
    const url = environment.apiUrl + '/customer/deleteCustomerById.php';
    const id = customer.id;
    return this.http.post(url, { id });
  }
}
