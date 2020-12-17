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

  assignInternalActivity(internalactivityid , userid){
    const url = environment.apiUrl + 'internalActivities/assignInternalActivityToUser.php';
    return this.http.post<any>(url, { userid , internalactivityid });
  }

  removeInternalActivity(internalactivitiesid , userid){
    const url = environment.apiUrl + 'internalActivities/deassignInternalActivitiesToUser.php';
    return this.http.post<any>(url, {internalactivitiesid , userid});
  }

  getInternalActivitiesList(id){
    const url = environment.apiUrl + '/internalActivities/listInternalActivitiesAndOffice.php';
    return this.http.post(url, id);
  }
}
