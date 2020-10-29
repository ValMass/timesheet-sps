import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})

export class FileService {

  constructor(private http: HttpClient) { }

  downloadTimesheetSummaryFile( month, year ): any {
    const url = environment.apiUrl + 'timesheets/exportTimesheetsByMonthAndYear.php';
    return this.http.post(url, { month, year }, {responseType: 'blob'});
  }

  downloadSingleTimesheetFile( month, year , userid ): any {
    const url = environment.apiUrl + 'timesheets/exportOneTimesheetToXlsx.php';
    return this.http.post(url, { month, year, userid }, {responseType: 'blob'});
  }
}
