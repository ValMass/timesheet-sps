import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Contract } from '@app/modules/contracts/contract';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  constructor(
    private http: HttpClient
    ) { }

  getAllContracts(){
    console.log('allcontracts');
    
    const url = environment.apiUrl + '/contract/listAllContract.php';
    return this.http.get<Contract[]>(url);
  }

  addContract( contract ) {
    const contracttype = contract.contracttype;
    const level = contract.level;
    const ccnl = contract.ccnl;
    const title = contract.title;
    const url = environment.apiUrl + '/contract/createContract.php';
    return this.http.post(url, { contracttype, level, ccnl, title  });

  }


}
