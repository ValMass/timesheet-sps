import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerOfficeMatrix } from '@app/models/customerOfficeMatrix';
import { Office } from '@app/models/office';
import { Customer } from '@app/modules/customers/customer';
import { environment } from '@environments/environment';
import { forkJoin, Observable, throwError } from 'rxjs';
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
   * 
   */
  getAllCustomer(): Observable<Customer[]> {
    const url = `${environment.apiUrl}customer/listAllCustomer.php`;
    return this.http.get<Customer[]>(url)
      .pipe(catchError(this.handleError));
  }

  /**
   * Torna la lista dei clienti con Nome e Sede.
   *
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
  addMatrixPointsToCustomerId(distance, officeId, customerId) {
    const url = `${environment.apiUrl}officeMatrix/createMatrixPoint.php`;
    return this.http.post(url, {'distance': distance, 'officeid': officeId, 'customerid': customerId})
      .pipe(catchError(this.handleError));
  }

  /**
   * Vengono prima calcolate le geocordinate dei due uffici per poi tornare la distanza (in km).
   * @param addressSps
   * @param addressCustomerOffice
   */
  async getDistanceFromOffice(addressSps, addressCustomerOffice) {
    const { results: spsResults } = await this.getGeocodeFromAddress(addressSps).toPromise();
    const { results: customerResults } = await this.getGeocodeFromAddress(addressCustomerOffice).toPromise();
    const { lat: latSps, lng: longSps } = spsResults[0].geometry.location;
    const { lat: latCustomer, lng: longCustomer } = customerResults[0].geometry.location;
    return this.calcolateDistance(latSps, longSps, latCustomer, longCustomer);
  }

  /**
   * Torna il geocode di un indirizzo.
   * @param address
   */
  getGeocodeFromAddress(address): Observable<any> {
    const url = `${environment.googleGeolocationApi}address=${address}&key=${environment.googleKey}`;
    return this.http.get(url)
      .pipe(catchError(this.handleError));
  }

  /**
   * Cerca il nome corretto di un cliente partendo da una lista di indirizzi e un companyid.
   * 
   * @param offices 
   * @param companyid 
   */
  findCompanyName(offices, companyid) {
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
  calcolateDistance(latSps, longSps, latCustomer, longCustomer) {
    const theta = longSps - longCustomer;
    let dist = Math.sin(this.deg2rad(latSps)) * Math.sin(this.deg2rad(latCustomer)) + Math.cos(this.deg2rad(latSps)) * Math.cos(this.deg2rad(latCustomer)) * Math.cos(this.deg2rad(theta));
    dist = Math.acos(dist);
    dist = this.rad2deg(dist);
    return Math.floor(dist * 60 * 1.1515 / 0.621371);
  }

  deg2rad(deg) {
    return deg * Math.PI / 180;
  }

  rad2deg(radians) {
    return radians * 180 / Math.PI;
  }

  handleError(error) {
    // lanciare eventuale modale di errore.
    console.log(error);
    return throwError(`Errore: ${error['message']}`);
  }
}