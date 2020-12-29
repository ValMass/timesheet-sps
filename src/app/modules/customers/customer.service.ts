import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { catchError, mergeMap, map } from 'rxjs/operators';
import { EMPTY, of, Observable } from 'rxjs';
import { Customer } from '@app/modules/customers/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService implements Resolve<any>  {

  constructor(private http: HttpClient, private route: ActivatedRoute, ) { }

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

  //see if type here generate errors
  getAllCustomers() :Observable<Customer[]>{
    console.log('allcustomers');
    
    const url = environment.apiUrl + '/customer/listAllCustomer.php';
    return this.http.get<Customer[]>(url);
  }

  createNewCustomer(customer) {
    const url = environment.apiUrl + '/customer/createCustomer.php';
    return this.http.post(url, customer);
  }

  //TODO
  updateCustomerOffice(customerOffice){
    const url = environment.apiUrl + 'customer/updateCustomerOfficesById.php';
    return this.http.post(url, customerOffice );
  }

  updateCustomer(customer){
    const url = environment.apiUrl + 'customer/updateCustomerById.php';
    return this.http.post(url, customer);
  }

  //pass id directly instead of entire object
  deleteCustomer(customerId) {
    const url = environment.apiUrl + 'customer/deleteCustomerById.php';
    return this.http.post(url, { id:customerId });
  }

  listAllCustomerOfficesByCustomerId(customerId){
    console.log(customerId);
    const url = environment.apiUrl + 'customerOffices/listAllCustomerOfficesByCustomerId.php';
    return this.http.post(url,{customerid:customerId});
  }

  //generic error handler,to use in .pipe(catchError) here in the service
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      //maybe here add customization to log out to database or to an error logging system
      
      console.error(error);
      return of(result as T)
    }
  }

  getAllActivityType(){
    const url = environment.apiUrl + '/activityType/listAllActivityType.php';
    return this.http.post(url , {});
  }
}
