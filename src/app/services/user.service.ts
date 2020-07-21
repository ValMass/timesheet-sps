import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable, EMPTY, of } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  save(user) {
    let realuser = user.data;
    const username = realuser.username;
    const password = realuser.password;
    const email = realuser.email;
    const userscreationdate = new Date();
    const url = environment.apiUrl + '/user/createUser.php';
    return this.http.post(url, { username, password, email, userscreationdate  });
  }

  delete(user){
    const id = user.id;
    const url = environment.apiUrl + '/user/deleteUserById.php';
    console.log(url);
    return this.http.post(url, { id });
  }
}
