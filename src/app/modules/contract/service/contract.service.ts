import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  constructor(
    private http: HttpClient
    ) { }

  addContract( contract ) {
    const contracttype = contract.contracttype;
    const level = contract.level;
    const ccnl = contract.ccnl;
    const title = contract.title;
    const url = environment.apiUrl + '/contract/createContract.php';
    return this.http.post(url, { contracttype, level, ccnl, title  });

  }
}
