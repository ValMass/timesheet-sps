import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TimesheethttpService implements Resolve<any> {

  constructor(
    private http: HttpClient,
  ) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    throw new Error("Method not implemented.");
  }
}
