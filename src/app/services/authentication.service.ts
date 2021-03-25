import { SavedataLocalStorageService } from '@app/services/savedata-local-storage.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/models/user';
import { Router } from '@angular/router';
import * as crypto from 'crypto-js';


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private refreshTokenTimeout : any;  

  constructor(private http: HttpClient, private router: Router, private savedataLocalStorageService : SavedataLocalStorageService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(this.decryptUserData(localStorage.getItem('currentUser'))));
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
        localStorage.setItem('currentUser',this.cryptUserData( JSON.stringify(user)));
        this.currentUserSubject.next(user);
        if(user.token != null && user.id != null){
          this.startRefreshTokenTimer();
        }
        return user;
      }));
  }

  logout() {
    this.savedataLocalStorageService.cleanValueStorage("currentData");
    //this.currentUserSubject.next(null);
    const url = environment.apiUrl + '/logout.php';
    this.stopRefreshTokenTimer();
    return this.http.post( url, {});
  }

  /**
   *  url = environment.apiUrl + '/refreshToken.php'; 
   *  grant_type = "refresh_token";
   *  client_id = "app";
   *  client_secret = "app";
   */
  refreshToken() {
    const url = environment.apiUrl + '/refreshToken.php'; 
    const grant_type = "refresh_token";
    const client_id = "app";
    const client_secret = "app";
    let refresh_token = null;
    if((localStorage.getItem('currentUser'))){
      refresh_token = (JSON.parse(this.decryptUserData(localStorage.getItem('currentUser')))).refresh_token;
    }

    if(!refresh_token){
      return throwError({ status: 401, error: { message: 'Unauthorized' } });
    }

    return this.http.post<any>(url , {grant_type , client_id , client_secret , refresh_token}).pipe(map(res => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      if(res["data"]["status"] === 200){
        const user = res["data"]["response"];
        localStorage.setItem('currentUser',this.cryptUserData( JSON.stringify(user)));
        this.currentUserSubject.next(user);
        this.startRefreshTokenTimer();
        return user;
      }else{
        this.logout();
      }
    }));
  }

  startRefreshTokenTimer() {
    const currentUser = (JSON.parse(this.decryptUserData(localStorage.getItem('currentUser'))))
    //è in millesecondi
    const expires = new Date (Number(currentUser.expire) * 1000);
    const timeout = expires.getTime();
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe() , timeout);
  }

  stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }

  /**
   * questa funzione cripta le informazioni dello user
   */
  cryptUserData(user : any){
    const cryptoTest = crypto.AES.encrypt(user, environment.key).toString()
    
    return cryptoTest;
  }

  /**
   * questa funzione decripta quello che è stato cryptato in precedenza
   */
  decryptUserData(userCrypted : any){
    if(userCrypted != null){
      const decCryptoTest = crypto.AES.decrypt(userCrypted, environment.key);
     
      return decCryptoTest.toString(crypto.enc.Utf8);
    }
    else{
      return null;
    }
  }

}
