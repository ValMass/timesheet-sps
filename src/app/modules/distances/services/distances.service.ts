import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerOfficeMatrix } from '@app/models/customerOfficeMatrix';
import { Office } from '@app/models/office';
import { Customer } from '@app/modules/customers/customer';
import { environment } from '@environments/environment';
import { forkJoin, from, Observable, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DistancesService {

  constructor(private readonly http: HttpClient) { }

  /**
   * Torna tutte le sedi di SPS.
   */
  getAllOffices(): Observable<Office[]> {
    const url = `${environment.apiUrl}/offices/listAllOffices.php`;
    return this.http.get<Office[]>(url)
      .pipe(catchError(this.handleError));
  }

  /**
   * Torna la lista dei clienti.
   */
  getAllCustomer(): Observable<Customer[]> {
    const url = `${environment.apiUrl}customer/listAllCustomer.php`;
    return this.http.get<Customer[]>(url)
      .pipe(catchError(this.handleError));
  }

  /**
   * Torna la lista dei clienti con Nome e Sede.
   */
  getAllCustomerOffice(): Observable<any> {
    const url = `${environment.apiUrl}customerOffices/listAllCustomerOffices.php`;
    return this.http.get<Array<any>>(url)
      .pipe(
        switchMap(val => {
          return forkJoin(val['data'].map(data => this.http.get(`${environment.apiUrl}customer/listAllCustomer.php`)))
            .pipe(
              map(offices => offices.map((office, index) => {
                return {...val['data'][index], ...{ name: this.findCompanyName(office['data'], val['data'][index].companyid) }}
              }))
            )
        })
      );
  }

  /**
   * Torna la lista dei clienti con la relativa distanza in km partendo da un determinato ufficio sps.
   * @param officeId
   */
  getListMatrixPointsByOfficeID(officeId): Observable<CustomerOfficeMatrix[]> {
    const url = `${environment.apiUrl}officesMatrix/listMatrixPointsByOfficeID.php`;
    return this.http.post<CustomerOfficeMatrix[]>(url, {officesid: officeId})
      .pipe(catchError(this.handleError));
  }

  /**
   * 
   * @param distance
   * @param officeId
   * @param customerId
   */
  updateMatrixPointsToCustomerId(distance, officeId, customerId): Observable<any> {
    const url = `${environment.apiUrl}officesMatrix/updateMatrixPoint.php`;
    return this.http.post(url, {'distance': distance, 'officeid': officeId, 'customerid': customerId})
      .pipe(catchError(this.handleError));
  }

  /**
   * Vengono prima calcolate le geocordinate dei due uffici per poi tornare la distanza.
   * @param addressSps
   * @param addressCustomerOffice
   */
  async getDistanceFromOffice(addressSps, addressCustomerOffice): Promise<any> {
    const sps = addressSps.address + ', ' + addressSps.city;
    const customer = addressCustomerOffice.address + ', ' + addressCustomerOffice.city;
    const { features: spsResults } = await this.getGeocodeFromAddress(sps).toPromise();
    const { features: customerResults } = await this.getGeocodeFromAddress(customer).toPromise();
    const spsCords = spsResults[0].geometry.coordinates;
    const customerCords = customerResults[0].geometry.coordinates;
    return await this.calcolateDistance(spsCords, customerCords).toPromise();
  }

  /**
   * Torna il geocode di un indirizzo.
   * @param address
   */
  getGeocodeFromAddress(address): Observable<any> {
    const url = `${environment.openRouteServiceGeoEndpoint}api_key=${environment.openRouteServiceKey}&text=${address}`;
    return this.http.get(url)
      .pipe(catchError(this.handleError));
  }

  /**
   * Cerca il nome corretto di un cliente partendo da una lista di indirizzi e un companyid.
   * 
   * @param offices 
   * @param companyid 
   */
  findCompanyName(offices, companyid): String {
    const company = offices.filter(office => office.companyid === companyid);
    return company[0].name;
  }

  /**
   * Calcola la distanza tra due coordinate e ritorna la distanza in km.
   * @param latSps
   * @param longSps
   * @param latCustomer
   * @param longCustomer
   */
  calcolateDistance(spsCords, customerCords): Observable<any> {
    const url = `${environment.openRouteServiceDirectionEndpoint}api_key=${environment.openRouteServiceKey}&start=${spsCords[0]},${spsCords[1]}&end=${customerCords[0]},${customerCords[1]}`;
    return this.http.get(url)
      .pipe(catchError(this.handleError));
  }

  handleError(error) {
    console.log(error);
    return throwError(`Errore: ${error['message']}`);
  }
}