import { Observable } from 'rxjs';
import { UserAdminCreationComponent } from './../../user-admin/user-admin-creation/user-admin-creation.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Office} from './../model/office'

@Injectable({
  providedIn: 'root'
})
export class InternalActivitiesService {

  constructor(
    private http: HttpClient
    ) { }

  createInternalActivities( officesid, name, startdate, enddate, referente){
    const url = environment.apiUrl + 'internalActivities/createInternalActivities.php';
    return this.http.post(url, {officesid, name, startdate, enddate, referente});

  }

  updateInternalActivities( id, officesid, name, startdate, enddate, referente){
    const url = environment.apiUrl + 'internalActivities/updateInternalActivitiesById.php';
    return this.http.post(url, {id , officesid, name, startdate, enddate, referente});

  }

  getInternalActivitiesList(id){
    const url = environment.apiUrl + '/internalActivities/listInternalActivitiesAndOffice.php';
    return this.http.post(url, id);

  }

  deleteInternalActivitiesList(id){
    console.log("serviceID" , id)
    const url = environment.apiUrl + '/internalActivities/deleteInternalActivitiesById.php';
    return this.http.post(url, {id});
  }

  getAllOffices():Observable<Office[]>{
    const url = environment.apiUrl + '/offices/listAllOffices.php';
    return this.http.get<Office[]>(url);

  }
}
