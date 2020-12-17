import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InternalactivityService {

  constructor(private http : HttpClient,) { }

  getInternalActivities(userid){
    const url = environment.apiUrl + 'internalActivities/listInternalActivitiesByUserId.php';
    return this.http.post<any>(url, { userid });
  }

  assignInternalActivity(internalActivityId){
    const url = environment.apiUrl + 'internalActivities/assignInternalActivityToUser.php';
    return this.http.post<any>(url, {internalActivityId});
  }

  removeInternalActivity(userid){
    const url = environment.apiUrl + '';
  }
}
