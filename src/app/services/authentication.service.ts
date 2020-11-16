import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private router: Router,) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  removeCurrentSubject() {
    this.currentUserSubject.next(null);
  }


  login(username: string, password: string) {
    const url = environment.apiUrl + '/login.php';
    const client_id = 'app';
    const client_secret = 'app';
    const grant_type = 'password';
    return this.http.post<any>(url, { username, password, client_id, client_secret, grant_type })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    //this.currentUserSubject.next(null);
    const url = environment.apiUrl + '/logout.php';
    return this.http.post( url, {});
  }


}
