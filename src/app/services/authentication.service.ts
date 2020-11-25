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
  key = 'TUc0emRqRXpkdw==';
  text = 'ciao'

  constructor(private http: HttpClient, private router: Router,) {
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
        //console.log("loginUser", user.token)
        //localStorage.setItem('tokenuser', JSON.stringify(user.token));
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser',this.cryptUserData( JSON.stringify(user)));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    //this.currentUserSubject.next(null);
    const url = environment.apiUrl + '/logout.php';
    return this.http.post( url, {});
  }

  /**
   * questa funzione cripta le informazioni dello user
   */
  cryptUserData(user : any){
    const cryptoTest = crypto.AES.encrypt(user, this.key).toString()
    
    console.log("md5Crypt: " , cryptoTest );
    
    return cryptoTest;
  }

  /**
   * questa funzione decripta quello che è stato cryptato in precedenza
   */
  decryptUserData(userCrypted : any){
    if(userCrypted != null){
      const decCryptoTest = crypto.AES.decrypt(userCrypted, this.key);

      console.log("md5Decrypt: " , decCryptoTest.toString(crypto.enc.Utf8));

      return decCryptoTest.toString(crypto.enc.Utf8);
    }
    else{
      return null;
    }
  }

}
