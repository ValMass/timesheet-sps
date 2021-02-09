import { SavedataLocalStorageService } from '@app/services/savedata-local-storage.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
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
        return user;
      }));
  }

  logout() {
    this.savedataLocalStorageService.cleanValueStorage("currentData");
    //this.currentUserSubject.next(null);
    const url = environment.apiUrl + '/logout.php';
    return this.http.post( url, {});
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
