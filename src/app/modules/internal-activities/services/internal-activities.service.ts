import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InternalActivitiesService {

  constructor(
    private http: HttpClient
    ) { }

  getInternalActivitiesList(id){
    const url = environment.apiUrl + '/offices/createOffices.php';
    return this.http.post(url, id);

  }
}
